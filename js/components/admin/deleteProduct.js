import warningMessage from "../warningMessage.js"
import {
    getToken
} from "../../utils/userStorage.js";
import {
    baseUrl
} from "../../settings/api.js"
export function triggerDeleteProduct(id) {

    const deleteButton = document.querySelector("#delete");
    deleteButton.addEventListener("click", function () {

        const messageContainer = document.querySelector("#messageContainer");
        messageContainer.style.textAlign = "center";
        warningMessage("alert-danger", `
        <p>Are you sure you want to delete this product?</p>
        <button type="button" class="btn btn-dark" id="confirmDelete">I'm sure</button>
        <button type="button" class="btn btn-outline-danger" id="cancelDelete">Cancel</button>
        `, "#messageContainer");

        const cancelDelete = document.querySelector("#cancelDelete");
        const confirmDelete = document.querySelector("#confirmDelete");

        cancelDelete.addEventListener("click", function () {
            messageContainer.style.display = "none";
        })

        confirmDelete.addEventListener("click", function () {
            deleteProduct(id);
        });
    })
}
async function deleteProduct(id) {
    const token = getToken();
    const url = baseUrl + "/products/" + id;

    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        submit.innerHTML = `Product deleted <i class="fas fa-check"></i>`;
        warningMessage("alert-danger", "Product deleted", "#messageContainer");
        location.href = "/admin.html";
        console.log(json);

    } catch (error) {
        console.log(error);
        return warningMessage("alert-danger", error, "#messageContainer");
    }
}