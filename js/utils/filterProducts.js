import {
    createProducts
} from "../components/allProducts.js";
import {
    createAdminProducts
} from "../components/admin/adminProducts.js"

export default function filterProducts(products) {
    const search = document.querySelector("#search");

    search.onkeyup = function (event) {
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredProducts = products.filter(function (product) {
            if (product.name.toLowerCase().includes(searchValue)) {
                return true;
            } else if (product.description && product.description.toLowerCase().includes(searchValue)) {
                return true;
            }
        });

        createProducts(filteredProducts);
    };
}
export function filterAdminProducts(products) {
    const search = document.querySelector("#search");

    search.onkeyup = function (event) {
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredProducts = products.filter(function (product) {
            if (product.name.toLowerCase().includes(searchValue)) {
                return true;
            } else if (product.description && product.description.toLowerCase().includes(searchValue)) {
                return true;
            }
        });

        createAdminProducts(filteredProducts);
    };
}