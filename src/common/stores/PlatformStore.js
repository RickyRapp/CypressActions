import { action } from 'mobx';
import { BaasicPlatform } from 'baasic-sdk-reactjs';
import { moduleProviderFactory, moduleBuilder } from 'core/providers';
import { baasicKeyGenerator } from 'core/utils';
import { baasicOptions } from 'common/infrastructure';

const platformKey = 'platform';

class PlatformStore {
    constructor(rootStore) {
        this.rootStore = rootStore;       
    }

    platform = null;
    get platformExists() { return this.platform !== undefined && this.platform !== null; }

    @action setPlatform(platform) {
        this.platform = platform;
    }

    @action extend(stores) {
        this.setPlatform({
            ...this.platform,
            ...stores
        });
    }

    @action register(config = {}) {
        if (this.platform !== undefined && this.platform !== null)
            return this.platform;

        const customOptions = {
            ...baasicOptions,
            ...config
        };
    
        const platform = new BaasicPlatform({
            storageHandler: { keyGenerator: baasicKeyGenerator },
            ...customOptions
        });

        this.setPlatform({ baasic: platform });

        const stores = moduleBuilder.buildStores(['platform'], { appKey: platformKey });
        this.rootStore.initializeStores(stores);

        return platform;
    }
}

export default PlatformStore;