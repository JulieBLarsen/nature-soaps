const tokenKey = "token";
const userKey = "user";


export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    }
    return JSON.parse(value);
}

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function getUser() {
    return getFromStorage(userKey);
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    }

    return null;
}