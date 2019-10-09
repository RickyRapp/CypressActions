import {localStorageProvider} from 'core/providers';

const CACHE_PREFIX = 'CS';

class CacheService  {
    composeKey(key, region = null) {
        if(region) {
            return `${CACHE_PREFIX}-${region}-${key}`;
        }
        return `${CACHE_PREFIX}-${key}`;
    }

    add(key, data, region = null) {
        const composedKey = this.composeKey(key, region);

        localStorageProvider.add(composedKey, data);
    }

    get(key, region = null) {
        const composedKey = this.composeKey(key, region);

        return localStorageProvider.get(composedKey);
    }

    remove(key, region = null) {
        const composedKey = this.composeKey(key, region);

        localStorageProvider.remove(composedKey);
    }

    clearRegion(region) {
        const keys = localStorageProvider.getKeys();
        const regionKeys = keys.filter(k => k.startsWith(`${CACHE_PREFIX}-${region}`));

        regionKeys.forEach(key => {
            localStorageProvider.remove(key);
        });
    }

    clear() {
        const keys = localStorageProvider.getKeys();
        const cacheKeys = keys.filter(k => k.startsWith(CACHE_PREFIX));

        cacheKeys.forEach(key => {
            localStorageProvider.remove(key);
        });
    }
}

export default new CacheService();
