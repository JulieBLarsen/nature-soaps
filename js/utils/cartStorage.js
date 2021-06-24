export const cartItemsKey = "cart items";

export function saveToStorage(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

export function getFromStorage(key) {
    const items = localStorage.getItem(key);

    if (!items) {
        return [];
    }
    return JSON.parse(items);
}