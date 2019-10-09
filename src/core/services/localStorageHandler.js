class LocalStorageHandler {
    constructor() {
        if (!localStorage) {
            throw new Error('Local storage not found.');
        }
    }

    clear() {
        return localStorage.clear();
    }

    remove(key) {
        return localStorage.removeItem(key);
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

const localStorageHandler = new LocalStorageHandler();
export default localStorageHandler;