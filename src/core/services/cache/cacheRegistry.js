class CacheRegistry {
    cachedItems = [];

    constructor() {

    }

    /**
     * Registers new key and callback function for caching items. If key already exists, it won't register it.
     * @param key
     * @param callbackFn
     */
    register(key, callbackFn) {
        if(!this.keyExists(key)) {
            this.cachedItems.push({ key: key, callbackFn: callbackFn });
        }
    }

    remove(key) {
        const itemIdx = this.cachedItems.indexOf(i => i.key === key);

        if (itemIdx > -1) {
            this.cachedItems = this.cachedItems.slice(itemIdx, 1);
        }
    }

    getExistingKeys() {
        return this.cachedItems.map(i => i.key);
    }

    keyExists(key) {
        return this.getExistingKeys().indexOf(key) > -1;
    }

    clear() {
        this.cachedItems = [];
    }

    /**
     * Executes key callback
     * @param key
     */
    reloadKey = async (key) => {
        const item = this.cachedItems.find(i => i.key === key);

        if (item && item.callbackFn) {
            await item.callbackFn();
        }
    };

    /**
     * Executes all callback in order to reload cache
     */
    reloadCache = async () => {
        let promises = [];

        this.cachedItems.forEach(item => {
            if (item && item.callbackFn) {
                promises.push(item.callbackFn);
            }
        });

        await Promise.all(promises);
    }
}

export default new CacheRegistry();
