import {
    baseUrl
} from "../settings/api.js";
import warningMessage from "./warningMessage.js";
import filterProducts from "../utils/filterProducts.js";
import {
    productImgSmall
} from "../utils/productImg.js";


export default async function getProducts() {
    try {
        const productsUrl = baseUrl + "/products";
        const response = await fetch(productsUrl);
        const products = await response.json();

        filterProducts(products);
        createProducts(products);

    } catch (error) {
        console.log(error);
    }
}

export function createProducts(products) {
    const container = document.querySelector(".container__products");
    container.innerHTML = "";
    if (products.length === 0) {
        warningMessage("alert-warning", "No products matched your search", ".search-warning");
    } else {
        const warningContainer = document.querySelector(".search-warning"); {
            warningContainer.style.display = "none";
        }
        products.forEach(function (product) {
            const productImg = productImgSmall(product);
            let featured = "";
            if (product.featured === null || !product.featured) {
                featured = false;
            } else {
                featured = true;
            }

            if (featured) {
                container.innerHTML += `
                <div class="col mb-4 single__product">
                    <div class="card  h-100">
                    <div class="card--featured">
                    <a href="product.html?id=${product.id}"><img src="${productImg}" class="card-img-top" alt="${product.name} soap"></a>
                    <p>Bestseller</p>
                    </div>
                        <div class="d-flex flex-column justify-content-between">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">$${product.price}</p>
                            </div>
                        <div class="card-footer w-100">
                            <a href="product.html?id=${product.id}">View details</a>
                        </div>
                        </div>
                    </div>
                </div>`;
            } else {
                container.innerHTML += `
    <div class="col mb-4 single__product">
        <div class="card  h-100">
        <a href="product.html?id=${product.id}"><img src="${productImg}" class="card-img-top" alt="${product.name} soap"></a>
            <div class="d-flex flex-column justify-content-between">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                </div>
            <div class="card-footer w-100">
                <a href="product.html?id=${product.id}">View details</a>
            </div>
            </div>
        </div>
    </div>`;
            }

        });
    }
}