export default function warningMessage(messageStyle, message, container) {
    const messageContainer = document.querySelector(container);
    messageContainer.style.display = "block";
    messageContainer.innerHTML = `<div class="alert ${messageStyle}">${message}</div>`;
}