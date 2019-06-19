import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { isSome } from "core/utils";
import { BankAccountService, FileStreamRouteService, FileStreamService, DonorAccountService } from "common/data";
import { BankAccountForm } from "modules/common/bank-account/forms";
import { UnhandledErrorMessage, donorPath, bankAccountPath } from "core/utils"
import _ from 'lodash';

class BankAccountEditViewStore extends BaseViewStore {
    @observable bankAccount = null;
    @observable imgPreview = null;
    @observable form = null;

    constructor(rootStore, { id, onAfterUpdate, item = null }) {
        super(rootStore);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        this.fileStreamRouteService = new FileStreamRouteService(rootStore.app.baasic.apiClient);
        this.fileStreamService = new FileStreamService(rootStore.app.baasic.apiClient);
        this.rootStore = rootStore;
        this.id = id;
        this.item = item;
        this.onAfterUpdate = onAfterUpdate;
        this.UnhandledErrorMessage = UnhandledErrorMessage;

        this.load();
    }

    @action.bound
    async load() {
        // const donorAccount = await this.donorAccountService.get(this.id);
        await this.initializeForm();
    }

    @action.bound async initializeForm() {
        this.form = new BankAccountForm({
            onSuccess: async form => {
                const item = form.values();
                this.form.setFieldsDisabled(true);

                try {
                    if (this.form.$('image').files) {
                        // const fileResponse = await this.fileStreamService.create(
                        //     this.form.$('image').files[0],
                        //     donorPath + accountNumber + '/' + bankAccountPath + this.form.$('image').files[0].name
                        // );
                        // item.coreMediaVaultEntryId = fileResponse.data.id;
                        alert('todo: image upload')
                    }
                } catch ({ data }) {
                    if (data) {
                        this.rootStore.notificationStore.error(data.message);
                    }
                    else {
                        this.rootStore.notificationStore.error(this.UnhandledErrorMessage);
                    }
                    this.form.setFieldsDisabled(false);
                    return;
                }

                try {
                    item.id = this.id;
                    const response = await this.bankAccountService.update(item);
                    this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
                    this.form.setFieldsDisabled(false);
                    if (_.isFunction(this.onAfterUpdate)) {
                        await this.onAfterUpdate();
                    }
                    else {
                        await this.getResource(this.id);
                    }
                } catch (errorResponse) {
                    this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
                    this.form.setFieldsDisabled(false);
                    return;
                }
            },
            onError(form) {
                alert('### see console');
                console.log('Form Errors', form.errors());
            },
        });

        await this.getResource(this.id);
    }

    @action.bound async getResource(id, updateForm = true) {
        if (this.item) {
            this.bankAccount = this.item;
        }
        else {
            let params = {};
            params.embed = params.embed = ['thirdPartyAccountHolder,address,emailAddress,phoneNumber'];
            const response = await this.bankAccountService.get(id, params);
            this.bankAccount = response;
        }

        if (this.bankAccount.coreMediaVaultEntryId) {
            this.imgPreview = await this.fileStreamRouteService.getPreview(this.bankAccount.coreMediaVaultEntryId)
        }
        this.bankAccount.thirdParty = isSome(this.bankAccount.thirdPartyAccountHolder)

        if (updateForm) {
            this.form.set('value', this.bankAccount)
        }
    }
}
export default BankAccountEditViewStore;