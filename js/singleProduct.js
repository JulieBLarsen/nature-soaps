import createMenu from "./components/menu.js";
import warningMessage from "./components/warningMessage.js";
import {
    baseUrl
} from "./settings/api.js";
import {
    cartItemsKey,
    saveToStorage,
    getFromStorage
} from "./utils/cartStorage.js";
import {
    productImgLarge
} from "./utils/productImg.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "index.html";
}

async function getSingleProduct() {
    try {
        const productsUrl = baseUrl + `/products?id=${id}`;
        const response = await fetch(productsUrl);
        const product = await response.json();
        createSingleProduct(product);
        isItemInCart(product);
        addToCart(product);
    } catch (error) {
        console.log(error);

        warningMessage("alert-danger", error, ".container__products--single");
    }
}

getSingleProduct();

function createSingleProduct(products) {
    let buttonText = "";
    if (isItemInCart(products)) {
        buttonText = "Remove from cart";
    } else {
        buttonText = "Add to cart";
    }

    const container = document.querySelector(".container__products--single");
    container.innerHTML = "";
    let featured = "";

    products.forEach(function (product) {
        document.title = "Nature Soaps | " + product.name;
        if (product.featured === null || !product.featured) {
            featured = "";
        } else {
            featured = `<div class="card--featured">
            <p>Bestseller</p>
            </div>`;
        }
        const productImg = productImgLarge(product);

        container.innerHTML += `
        <div class="col-12 col-xl-8">
            <img src="${productImg}" class="w-100" alt="${product.name} soap">
        </div>
        <div class="col-12 col-xl-4 d-flex flex-column justify-content-center align-items-start product__info">
        ${featured}
            <h1>${product.name}</h1>
            <p class="product__description">${product.description}</p>
            <p class="product__price">$${product.price}</p>
            <a class="btn btn-primary button" id="addToCartButton">${buttonText}</a>
        </div>`;
        const breadcrumb = document.querySelector(".breadcrumb-item.active");
        breadcrumb.innerHTML = `${product.name}`;
    });
    if (featured) {
        const featuredText = document.querySelector(".card--featured p");
        featuredText.style.position = "relative";
    }
}

function isItemInCart(product) {
    const cartItemsList = getFromStorage(cartItemsKey);
    const id = product[0].id;
    const itemInCart = cartItemsList.find(function (product) {
        return product.id === id;
    });
    if (itemInCart === undefined) {
        return false;
    } else {
        return true;
    }
}

function addToCart(product) {
    const button = document.querySelector("#addToCartButton");

    const id = product[0].id;
    let productImg = "";
    if (product[0].image) {
        if (product[0].image.formats.small) {
            productImg = product[0].image.formats.small.url;
        } else {
            productImg = product[0].image.url;
        }
    } else {
        productImg = "../img/noimagefound.jpg";
    }

    button.addEventListener("click", function (event) {
        const cartItemsList = getFromStorage(cartItemsKey);

        if (!isItemInCart(product)) {
            const cartItem = {
                id: product[0].id,
                name: product[0].name,
                image: productImg,
                description: product[0].description,
                price: product[0].price,
                featured: product[0].featured
            };

            cartItemsList.push(cartItem);
            saveToStorage(cartItemsKey, cartItemsList);
            event.target.innerText = "Remove from cart";

        } else {
            const newCartItemsList = cartItemsList.filter((product) => product.id !== id);
            saveToStorage(cartItemsKey, newCartItemsList);
            event.target.innerText = "Add to cart";
        }
    })
}