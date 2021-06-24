import createMenu from "./components/menu.js";
import warningMessage from "./components/warningMessage.js";
import {
    cartItemsKey,
    saveToStorage,
    getFromStorage
} from "./utils/cartStorage.js";
import {
    productImgSmall
} from "./utils/productImg.js";

createMenu();

const containerCartItems = document.querySelector(".container__products__cart");
const clearCartButton = document.querySelector("#clearCart");
const priceContainer = document.querySelector(".container__products__cart__price");

// Remove all cart items from local storage
clearCartButton.addEventListener("click", function () {
    window.localStorage.removeItem(cartItemsKey);
    createCartItems(getFromStorage(cartItemsKey));
});

// Make empty price array
let priceArray = [];

const cartItems = getFromStorage(cartItemsKey);
createCartItems(cartItems);

// Create cart items HTML based on product list in local storage
function createCartItems(products) {
    containerCartItems.innerHTML = "";

    // Show warning if cart is empty
    if (products.length === 0) {
        warningMessage("alert-warning", "No products in cart", ".container__products__cart");
        priceContainer.style.display = "none";

    } else {
        products.forEach(function (product) {
            const productImg = product.image;
            // Add price of product to price array
            priceArray.push(product.price);
            let featured = "";
            if (product.featured === null || !product.featured) {
                featured = false;
            } else {
                featured = true;
            }
            if (featured) {
                containerCartItems.innerHTML += `
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <div class="card--featured">
                        <a href="product.html?id=${product.id}"><img src="${productImg}" class="card-img" alt="..."></a>
                        <p>Bestseller</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price}</p>
                                <div>
                                    <a class="btn btn-primary" href="product.html?id=${product.id}">View details<i class="fas fa-angle-right"></i></a>
                                    <p class="btn btn-outline-dark" id="removeFromCartButton" data-id="${product.id}">Remove<i class="far fa-trash-alt"></i></p>
                                </div>
                        </div>
                    </div>
                </div>
                <hr>`;
            } else {
                containerCartItems.innerHTML += `
    <div class="row no-gutters">
        <div class="col-md-4">
            <a href="product.html?id=${product.id}"><img src="${productImg}" class="card-img" alt="..."></a>
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price}</p>
                    <div>
                        <a class="btn btn-primary" href="product.html?id=${product.id}">View details<i class="fas fa-angle-right"></i></a>
                        <p class="btn btn-outline-dark" id="removeFromCartButton" data-id="${product.id}">Remove<i class="far fa-trash-alt"></i></p>
                    </div>
            </div>
        </div>
    </div>
    <hr>`;
            }


        });
    }
    // Select all remove from cart buttons and trigger remove function on click
    const removeButtons = document.querySelectorAll("#removeFromCartButton");
    removeButtons.forEach(function (button) {
        button.addEventListener("click", (event) => removeFromCart(event))
    });

    // Call function to calculate total price
    getTotalPrice(priceArray);
}

// Add product prices together and display in HTML
function getTotalPrice(priceArray) {
    const containerTotalPrice = document.querySelector(".container__products__cart__price span");

    const totalPrice = priceArray.reduce(function (a, b) {
        return a + b;
    }, 0)
    containerTotalPrice.innerHTML = totalPrice;
}

// See if product remove button id matches id in local storage list, if true then remove from localstorage and create cart HTML again with new list and reset price array so it can be calculated again
function removeFromCart(event) {
    const cartItems = getFromStorage(cartItemsKey);
    const id = parseInt(event.target.dataset.id);

    const newCartItems = cartItems.filter(function (cartItem) {
        if (cartItem.id !== id) {
            return true;
        }
    });

    saveToStorage(cartItemsKey, newCartItems);
    priceArray = [];
    createCartItems(newCartItems);
}