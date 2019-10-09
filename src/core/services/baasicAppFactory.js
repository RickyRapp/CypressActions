import { BaasicApp } from 'baasic-sdk-reactjs';
import { baasicOptions } from 'common/infrastructure';
import { baasicKeyHandler } from 'core/utils';

class BaasicAppFactory {
    constructor(options) {
        this.options = options;
    }

    create(apiKey) {
        return new BaasicApp(apiKey, {
            storageHandler: { keyGenerator: baasicKeyHandler },
            ...this.options
        });
    }    
}

const baasicAppFactory = new BaasicAppFactory(baasicOptions);
export default baasicAppFactory;