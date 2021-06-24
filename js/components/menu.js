import logOut from "./logout.js";
import {
    getUser
} from "../utils/userStorage.js"

export default function createMenu() {

    const {
        pathname
    } = document.location;
    const container = document.querySelector(".navbar-nav");
    const user = getUser();

    let adminLink = `<li class="nav-item">
            <a class="nav-link ${pathname === "/login.html" ? "active" : ""}" href="login.html">
            <i class="fas fa-lock icon"></i>Admin</a>
        </li>`;
    let cartLink = `<li class="nav-item">
            <a class="nav-link ${pathname === "/cart.html" ? "active" : ""}" href="cart.html">
            <i class="fas fa-shopping-cart icon"></i>Cart</a>
        </li>`;
    if (user) {
        adminLink = `<li class="nav-item">
            <a class="nav-link ${pathname === "/admin.html" ? "active" : ""}" href="admin.html">
            <i class="fas fa-lock-open icon"></i>Admin</a>
        </li>`;

        cartLink = `
        <li class="nav-item">
            <a class="nav-link ${pathname === "/cart.html" ? "active" : ""}" href="cart.html">
            <i class="fas fa-shopping-cart icon"></i>Cart</a>
        </li>
        <li class="nav-item logout">
        <a class="nav-link ${pathname === "" ? "active" : ""}" href="/" data-toggle="modal" data-target="#staticBackdrop">
        <i class="fas fa-sign-out-alt icon"></i>Log out</a>
    </li>
    `;
    }

    container.innerHTML = `<li class="nav-item">
            <a class="nav-link ${pathname === "/" ? "active" : ""}" href="/"><i class="fas fa-home icon"></i>Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${pathname === "/products.html" ? "active" : ""}" href="products.html"><i class="fas fa-leaf icon"></i>Products</a>
        </li>
        ${adminLink}
        ${cartLink}
`;
    if (user) {
        logOut();
    }
};