class LocalStorageProvider {
    constructor() {
    }

    add(storageKey, item) {
        if(typeof item === 'string') {
            localStorage.setItem(storageKey, item);
        }
        else {
            localStorage.setItem(storageKey, JSON.stringify(item));
        }
    }

    get(storageKey) {
        const item = localStorage.getItem(storageKey);
        try {
            return JSON.parse(item);
        } catch(err) {
            return item;
        }
    }

    remove(storageKey) {

        localStorage.removeItem(storageKey);
    }

    getKeys() {
        let keys = [];

        for(let i = 0, len = localStorage.length; i < len; ++i) {
            keys.push(localStorage.key(i));
        }

        return keys;
    }
}

export default new LocalStorageProvider();
