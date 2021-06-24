import createMenu from "./components/menu.js";
import {
    baseUrl
} from "./settings/api.js"
import {
    getToken
} from "./utils/userStorage.js";
import warningMessage from "./components/warningMessage.js";
import {
    productImgSmall
} from "./utils/productImg.js";
import {
    triggerDeleteProduct
} from "./components/admin/deleteProduct.js";

if (!getToken()) {
    location.href = "/";
}
createMenu();


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "index.html";
}
triggerDeleteProduct(id);
getProduct(id);

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const descriptionInput = document.querySelector("#description");
const featuredCheck = document.querySelector("#featuredCheck");

const fileInput = document.querySelector("#uploadFile");
const fileMessage = document.querySelector(".image-warning");
const fileLabel = document.querySelector(".custom-file-label");
const imgPreview = document.querySelector("#uploadImage");

const message = document.querySelector("#messageContainer");

// Get product info
async function getProduct() {
    try {
        const productsUrl = baseUrl + `/products/${id}`;
        const response = await fetch(productsUrl);
        const product = await response.json();

        placeProductInfo(product);

    } catch (error) {
        console.log(error);

        warningMessage("alert-danger", error, ".container__products--single");
    }
}
// Place product info inside form
function placeProductInfo(product) {
    nameInput.value = product.name;
    priceInput.value = product.price;
    descriptionInput.value = product.description;
    featuredCheck.checked = product.featured;
    fileLabel.innerHTML = product.image.name;
    imgPreview.style.display = "block";
    imgPreview.src = productImgSmall(product);
}

// Alert user if file is too big, and show image preview
fileInput.onchange = () => {
    fileMessage.innerHTML = "";
    imgPreview.style.display = "none";
    const file = fileInput.files[0];

    if (file.size >= 200000) {
        fileLabel.innerHTML = "Choose image...";
        return warningMessage("alert-warning", "File size too big", ".image-warning");
    } else {
        fileLabel.innerHTML = file.name;
        let src = URL.createObjectURL(file);
        imgPreview.src = src;
        imgPreview.style.display = "block";
    }
}

form.addEventListener("submit", getProductFormData)

function getProductFormData(event) {
    event.preventDefault();
    message.innerHTML = "";
    const formData = new FormData();
    const formElements = form.elements;

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const description = descriptionInput.value.trim();
    const featured = featuredCheck.checked;

    if (name.length === 0 || description.length === 0 || price.length === 0 || isNaN(price)) {
        return warningMessage("alert-warning", "Please enter all information", "#messageContainer");

    } else {
        const data = {
            name: name,
            price: price,
            description: description,
            featured: featured,
        };

        // Get file data
        for (let i = 0; i < formElements.length; i++) {
            const currentElement = formElements[i];
            if (!['submit', 'file'].includes(currentElement.type)) {
                data[currentElement.name] = currentElement.value;
            } else if (currentElement.type === 'file') {
                if (currentElement.files.length === 1) {
                    const file = currentElement.files[0];
                    formData.append(`files.${currentElement.name}`, file, file.name);
                } else {
                    for (let i = 0; i < currentElement.files.length; i++) {
                        const file = currentElement.files[i];
                        formData.append(`files.${currentElement.name}`, file, file.name);
                    }
                }
            }
        }

        formData.append('data', JSON.stringify(data));

        trySubmitProduct(formData, id);
    }
}

// Post new product to strapi
async function trySubmitProduct(data, id) {
    const token = getToken();
    const url = baseUrl + "/products/" + id;

    const options = {
        method: "PUT",
        body: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            submit.innerHTML = `Product added <i class="fas fa-check"></i>`;
            imgPreview.style.display = "none";
            fileLabel.innerHTML = "Choose image..."
            form.reset();
            return warningMessage("alert-success", "Product edited successfully", "#messageContainer");
        }

        if (json.error) {
            return warningMessage("alert-danger", json.error, "#messageContainer");
        }

    } catch (error) {
        console.log(error);
        return warningMessage("alert-danger", error, "#messageContainer");
    }
}