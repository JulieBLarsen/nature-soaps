import createMenu from "./components/menu.js";
import {
    getUsername,
    getToken
} from "./utils/userStorage.js";
import filterProducts from "./utils/filterProducts.js";
import getProducts from "./components/admin/adminProducts.js";

if (!getToken()) {
    location.href = "/";
}

filterProducts();
getProducts();
createMenu();
const username = getUsername();

const h1 = document.querySelector("h1");
h1.innerHTML = `Hello ${username}!`;