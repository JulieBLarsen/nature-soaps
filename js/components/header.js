import {
    baseUrl
} from "../settings/api.js";

export default async function getHeader() {
    try {
        const homeURL = baseUrl + "/home";
        const response = await fetch(homeURL);
        const home = await response.json();

        createHeroBanner(home);

    } catch (error) {
        console.log(error);
    }
}

function createHeroBanner(home) {
    const header = document.querySelector(".header__background");
    header.style.background = `url(${home.home_banner.url})`;
}