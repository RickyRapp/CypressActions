import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityAddressEditForm } from 'application/charity/charity/forms';

@applicationContext
class CharityVerificationViewStore extends BaseViewStore {

    constructor(rootStore) {
        super(rootStore)
        this.charityId = rootStore.userStore.applicationUser.id;

    }

}

export default CharityVerificationViewStore;
