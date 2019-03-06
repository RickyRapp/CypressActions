import { action, observable } from 'mobx';
import { DonorAccountService } from "common/data";
import { BaseViewStore } from 'core/stores';

class DonorAccountProfileViewStore extends BaseViewStore {
    @observable hideBankAccount = true;
    @observable hideAddress = true;
    @observable hideEmailAddress = true;
    @observable hidePhoneNumber = true;

    constructor(rootStore) {
        super(rootStore);

        this.permissions = {
            administrationRead: rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.read'),
            mainUpdate: rootStore.authStore.hasPermission('theDonorsFundSection.update'),
        }
    }

    @action.bound
    async onShowHideBankAccountChange() {
        if (event.target.checked) {
            this.hideBankAccount = true;
        }
        else {
            this.hideBankAccount = false;
        }
    }

    @action.bound
    async onShowHideAddressChange() {
        if (event.target.checked) {
            this.hideAddress = true;
        }
        else {
            this.hideAddress = false;
        }
    }

    @action.bound
    async onShowHideEmailAddressChange() {
        if (event.target.checked) {
            this.hideEmailAddress = true;
        }
        else {
            this.hideEmailAddress = false;
        }
    }

    @action.bound
    async onShowHidePhoneNumberChange() {
        if (event.target.checked) {
            this.hidePhoneNumber = true;
        }
        else {
            this.hidePhoneNumber = false;
        }
    }
}

export default DonorAccountProfileViewStore;