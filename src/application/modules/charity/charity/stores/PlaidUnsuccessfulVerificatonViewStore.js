import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class PlaidUnsuccessfulVerificatonViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore);
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.suspend();
        }
    }
}

export default PlaidUnsuccessfulVerificatonViewStore;
