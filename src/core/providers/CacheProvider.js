class CacheProvider {
    constructor(options = {}) {
        this.options = options;
    }

    set(key, value) {
        localStorage.setItem(this.getCacheKey(key), toString(value));
    }

    get(key) {
        return toObject(localStorage.getItem(this.getCacheKey(key)));
    }

    remove(key) {
        localStorage.removeItem(this.getCacheKey(key));
    }

    clear() {
        localStorage.clear();
    }

    getCacheKey(key) {
        return this.options.keyPrefix + (key ? '.' + key : '');
    }
}

function toObject(stringValue) {
    return JSON.parse(stringValue);
}

function toString(objectValue) {
    return JSON.stringify(objectValue);
}

export default CacheProvider;
