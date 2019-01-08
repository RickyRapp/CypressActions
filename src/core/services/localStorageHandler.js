import { baasicKeyGenerator } from 'core/utils';

class LocalStorageHandler {
    constructor() {
        if (!localStorage) {
            throw new Error("Local storage not found.");
        }
    }

    clear() {
        return localStorage.clear();
    }

    remove(key) {
        return localStorage.removeItem(baasicKeyGenerator(key));
    }

    get(key) {
        return JSON.parse(localStorage.getItem(baasicKeyGenerator(key)));
    }

    set(key, data) {
        localStorage.setItem(baasicKeyGenerator(key), JSON.stringify(data));
    }
};

const localStorageHandler = new LocalStorageHandler();
export default localStorageHandler;