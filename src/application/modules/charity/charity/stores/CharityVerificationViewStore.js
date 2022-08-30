import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityAddressEditForm } from 'application/charity/charity/forms';

@applicationContext
class CharityVerificationViewStore extends BaseViewStore {

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

    @action.bound
    charityLogout(){
        this.rootStore.viewStore.logout();
    }

}

export default CharityVerificationViewStore;
