import { BaseEditViewStore, BaasicUploadStore } from 'core/stores';
import { CharityUploadPhotoForm } from 'application/charity/charity/forms';
import { action, observable } from 'mobx';
import { CharityFileStreamService } from 'common/services';

class CharityUploadPhotoViewStore extends BaseEditViewStore{
    @observable image = null;
    @observable isEditEnabled = false;

    constructor(rootStore){
        super(rootStore, {
            name: 'charity-upload-logo',
            autoInit: false,
            actions: () => {
                return {
                    update: async () => {
                        return true;
                    },
                    get: async (id) => {
                        return true;
                    }
                }
            },
            FormClass: CharityUploadPhotoForm,
        });
        this.createImageUploadStore();

    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getCharityInfo()
            ]);
            if (this.charity.charityBankAccounts && this.charity.charityBankAccounts.length === 1) {
                this.id = this.charity.charityBankAccounts[0].id;
                await this.fetch([
                    this.getResource(this.id)
                ]);
            }
            this.form.$('routingNumber').onBlur = (event) => {
                this.onBlurRoutingNumber(event.target.value)
            };
            this.imageUploadStore.setInitialItems(this.form.$('coreMediaVaultEntryId').value)
        }
    }

    @action.bound
    async getImage(fileId) {
        if (this.attachment != null) {
            try {
                var service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
                this.imageLoading = true;
                const response = await service.get(fileId);
                this.imageLoading = false;
                return response;
            }
            catch (err) {
                this.uploadLoading = false;
                this.rootStore.notificationStore.error('ERROR', err);
            }
        }
        return null;
    }


    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore(null, {
            onDelete: () => { // eslint-disable-line
                //async call to delete if needed
                this.form.$('coreMediaVaultEntryId').clear();
            }
        });
    }

    @action.bound
    onEnableEditClick() {
        this.isEditEnabled = !this.isEditEnabled;
    }
}


export default CharityUploadPhotoViewStore;