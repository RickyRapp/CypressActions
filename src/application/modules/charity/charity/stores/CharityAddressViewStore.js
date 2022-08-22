import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityAddressEditForm } from 'application/charity/charity/forms';

@applicationContext
class CharityAddressViewStore extends BaseViewStore {
    addressService = null;
    @observable isEditEnabled = false;
    @observable editId = null;
    @observable addresses = [];

    form = new CharityAddressEditForm({
        onSuccess: async form => {
            const address = form.values();
            if (this.editId) {
                await this.updateAddressAsync(address);
            }
            else {
                await this.createAddressAsync(address);
            }
        }
    });

    constructor(rootStore) {
        super(rootStore)
        this.charityId = rootStore.userStore.applicationUser.id;
        this.loadAddress();
    }

    
    async loadAddress() {
        let params = {
            charityId: this.charityId,
            orderBy: 'isPrimary',
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.charity.charityStore.findCharityAddress(params);
        this.addresses = data.item;
        let primaryAddress = this.addresses.find(b => b.isPrimary === true);
        this.editId = primaryAddress && primaryAddress.id;
        this.form.update(primaryAddress);
        this.isEditEnabled = true;
    }

    @action.bound
    onEnableEditClick(address) {
        this.form.clear();
        this.editId = null;
        if (address) {
            this.form.update(address);
            this.editId = address.id;
        }
        else {
            this.editId = undefined;
        }
        this.isEditEnabled = true;
    }

    @action.bound
    onCancelEditClick() {
        this.form.clear();
        this.editId = null;
        this.isEditEnabled = false;
    }

    @action.bound
    async updateAddressAsync(entity) {
        try { 
            await this.rootStore.application.charity.charityStore.updateCharityAddress({ ...entity, id: this.editId });
            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            await this.loadAddress();
            this.onCancelEditClick();
        }
        catch (err) {
            this.rootStore.notificationStore.error('Error', err);
        }
    }

    @action.bound
    async createAddressAsync(entity) {
        try {
            await this.rootStore.application.charity.charityStore.createCharityAddress({
                charityId: this.charityId,
                ...entity
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            await this.loadAddress();
            this.onCancelEditClick();
        }
        catch (err) {
            this.rootStore.notificationStore.error('Error', err);
        }
    }

    @action.bound
    async markPrimary(address) {
        this.loaderStore.suspend();
        address.isPrimary = true;
        await this.updateAddressAsync(address);
        this.loaderStore.resume();
    }

    @action.bound
    async deleteAddress(address) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete address?`,
            async () => {
                address.isDeleted = true;
                await this.updateAddressAsync(address, 'EDIT_FORM_LAYOUT.SUCCESS_DELETE');
            }
        );
    }

}

export default CharityAddressViewStore;
