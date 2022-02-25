import { BaseEditViewStore, BaasicUploadStore } from 'core/stores';
import { CharityUploadLogoForm } from 'application/charity/charity/forms';
import { action, observable } from 'mobx';
import { CharityFileStreamService } from 'common/services';

class CharityUploadLogoViewStore extends BaseEditViewStore{
    @observable image = null;
    @observable isEditEnabled = false;

    constructor(rootStore){
        super(rootStore, {
            name: 'charity-upload-logo',
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    get: async (id) => {
                    return await rootStore.application.charity.charityStore.getCharityMedia(id, 'logo');
                    },
                    update: async () => {
                        await rootStore.application.charity.charityStore.uploadMedia(this.imageUploadStore.files[0], rootStore.userStore.applicationUser.id, 'logo');
                        rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                    },
            }
            },
            FormClass: CharityUploadLogoForm,
            onAfterAction: () => { this.getResource(this.id); }
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
                this.getCharityMedia()
            ]);
            
            this.imageUploadStore.setInitialItems(this.form.$('coreMediaVaultEntryId').value)
        }
    }

    async getCharityMedia() {
        this.charityMedia = await rootStore.application.charity.charityStore.getCharityMedia(rootStore.userStore.applicationUser.id, 'logo')
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


export default CharityUploadLogoViewStore;