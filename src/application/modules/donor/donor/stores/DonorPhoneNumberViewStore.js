import { action, observable } from 'mobx';
import { TableViewStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorPhoneNumberEditForm } from 'application/donor/donor/forms';

@applicationContext
class DonorPhoneNumberViewStore extends BaseViewStore {
    phoneNumberService = null;
    @observable isEditEnabled = false;
    @observable editId = null;
    @observable phoneNumbers = [];

    form = new DonorPhoneNumberEditForm({
        onSuccess: async form => {
            const phoneNumber = form.values();

            if (this.editId) {
                await this.updatePhoneNumberAsync(phoneNumber);
            }
            else {
                await this.createPhoneNumberAsync(phoneNumber);
            }
        }
    });

    constructor(rootStore) {
        super(rootStore)
        this.donorId = rootStore.userStore.applicationUser.id;

        this.loadPhoneNumbers();
    }

    async loadPhoneNumbers() {
        let params = {
            donorId: this.donorId,
            orderBy: 'isPrimary',
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.donor.donorStore.findPhoneNumber(params);
        this.phoneNumbers = data.item;
    }

    @action.bound
    onEnableEditClick(phoneNumber) {
        this.form.clear();
        this.editId = null;
        if (phoneNumber) {
            this.form.update(phoneNumber);
            this.editId = phoneNumber.id;
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
    async updatePhoneNumberAsync(entity, message) {
        try {
            await this.rootStore.application.donor.donorStore.updatePhoneNumber({ ...entity, id: this.editId });
            this.rootStore.notificationStore.success(message ? message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            await this.loadPhoneNumbers();
            this.onCancelEditClick();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async createPhoneNumberAsync(entity) {
        try {
            await this.rootStore.application.donor.donorStore.createPhoneNumber({
                donorId: this.donorId,
                ...entity
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            await this.loadPhoneNumbers();
            this.onCancelEditClick();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async markPrimary(phoneNumber) {
        this.loaderStore.suspend();
        phoneNumber.isPrimary = true;
        await this.updatePhoneNumberAsync(phoneNumber);
        this.loaderStore.resume();
    }

    @action.bound
    async deletePhoneNumber(phoneNumber) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete phone number?`,
            async () => {
                phoneNumber.isDeleted = true;
                await this.updatePhoneNumberAsync(phoneNumber, 'EDIT_FORM_LAYOUT.SUCCESS_DELETE');
            }
        );
    }
}

export default DonorPhoneNumberViewStore;
