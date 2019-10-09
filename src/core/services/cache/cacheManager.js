import {CacheProvider} from 'core/providers';

class CacheManager {
    cacheInstances = {};

    constructor() {
    }

    create(key, options) {
        let cacheProvider = this.cacheInstances[key];
        if (cacheProvider == null) {
            cacheProvider = new CacheProvider({
                keyPrefix: key,
                ...options
            });
            this.cacheInstances[key] = cacheProvider;
        }
        return cacheProvider;
    }
}

export default new CacheManager();
