import {
    baseUrl
} from "../settings/api.js";
import {
    productImgSmall
} from "../utils/productImg.js";

export default async function getFeaturedProducts() {
    try {
        const homeURL = baseUrl + "/products";
        const response = await fetch(homeURL);
        const featuredProducts = await response.json();

        createFeaturedProducts(featuredProducts);
    } catch (error) {
        console.log(error);
    }
}

function createFeaturedProducts(products) {
    const container = document.querySelector(".container__products");
    container.innerHTML = "";
    products.forEach(function (product) {

        if (product.featured) {
            const productImg = productImgSmall(product);
            container.innerHTML += `    
    <div class="col mb-4 single__product">
        <div class="card  h-100">
         <div class="card--featured">
            <a href="product.html?id=${product.id}">
                <img src="${productImg}" class="card-img-top" alt="${product.name} soap">
            </a>
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
        }
    });
}