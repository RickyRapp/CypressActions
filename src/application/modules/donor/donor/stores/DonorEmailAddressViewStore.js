import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorEmailAddressEditForm } from 'application/donor/donor/forms';

@applicationContext
class DonorEmailAddressViewStore extends BaseViewStore {
    emailAddressService = null;
    @observable isEditEnabled = true;
    @observable editId = null;
    @observable emailAddresses = [];

    form = new DonorEmailAddressEditForm({
        onSuccess: async form => {
            const emailAddress = form.values();

            if (this.editId) {
                await this.updateEmailAddressAsync(emailAddress);
            }
            else {
                await this.createEmailAddressAsync(emailAddress);
            }
        }
    });

    constructor(rootStore) {
        super(rootStore)
        this.donorId = rootStore.userStore.applicationUser.id;

        this.loadEmailAddress();
    }

    async loadEmailAddress() {
        let params = {
            donorId: this.donorId,
            orderBy: 'isPrimary',
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.donor.donorStore.findEmailAddress(params);
        this.emailAddresses = data.item;

        let primaryEmail = this.emailAddresses.find(e => e.isPrimary === true);
        this.editId = primaryEmail && primaryEmail.id;
        this.form.update(primaryEmail);
    }

    @action.bound
    onEnableEditClick(emailAddress) {
        this.form.clear();
        this.editId = null;
        if (emailAddress) {
            this.form.update(emailAddress);
            this.editId = emailAddress.id;
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
    async updateEmailAddressAsync(entity, message) {
        try {
            await this.rootStore.application.donor.donorStore.updateEmailAddress({ ...entity, id: this.editId });
            this.rootStore.notificationStore.success(message ? message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            await this.loadEmailAddress();
            this.onCancelEditClick();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async createEmailAddressAsync(entity) {
        try {
            await this.rootStore.application.donor.donorStore.createEmailAddress({
                donorId: this.donorId,
                ...entity
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            await this.loadEmailAddress();
            this.onCancelEditClick();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async markPrimary(emailAddress) {
        this.loaderStore.suspend();
        emailAddress.isPrimary = true;
        await this.updateEmailAddressAsync(emailAddress);
        this.loaderStore.resume();
    }

    @action.bound
    async deleteEmailAddress(emailAddress) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete email address?`,
            async () => {
                emailAddress.isDeleted = true;
                await this.updateEmailAddressAsync(emailAddress, 'EDIT_FORM_LAYOUT.SUCCESS_DELETE');
            }
        );
    }
}

export default DonorEmailAddressViewStore;
