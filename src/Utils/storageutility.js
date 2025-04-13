export function getLocalStorage(itemKey) {
    const itemData = window.localStorage.getItem(itemKey);
    return JSON.parse(itemData)
}

export function setLocalStorage(itemKey, payload) {
    window.localStorage.setItem(itemKey, JSON.stringify(payload))
}
export function removeLocalStorage(itemKey) {
    window.localStorage.removeItem(itemKey);
}

export function getSessionStorage(itemKey) {
    const itemData = window.sessionStorage.getItem(itemKey)
    return JSON.parse(itemData);
}

export function setSessionStorage(itemKey, payload) {
    window.sessionStorage.setItem(itemKey, JSON.stringify(payload))
}
