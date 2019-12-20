import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { CharityBankAccountService } from 'application/charity/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { CharityBankAccountEditForm } from 'application/charity/forms';
import { CharityFileStreamService, CharityFileStreamRouteService } from 'common/services';

@applicationContext
class CharityBankAccountEditViewStore extends BaseEditViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable currentImage = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];
    bankAccountService = null;

    constructor(rootStore, { charityId }) {
        super(rootStore, {
            name: 'charity-bank-account',
            id: undefined,
            actions: () => {
                const service = new CharityBankAccountService(rootStore.application.baasic.apiClient);
                return {
                    get: async () => {
                        const params = {
                            embed: ['accountHolder', 'coreMediaVaultEntry'],
                            charityId: charityId
                        }

                        const response = await service.find(params);
                        if (response.data.item && response.data.item.length > 1) {
                            this.rootStore.notificationStore.warning('There is a problem with fetching bank account.')
                            return {};
                        }
                        if (response.data.item[0].coreMediaVaultEntryId) {
                            const service = new CharityFileStreamRouteService();
                            this.currentImage = service.getPreview(response.data.item[0].coreMediaVaultEntryId)
                        }
                        this.setEditState(response.data.item[0].id);
                        return response.data.item[0];
                    },
                    update: async (resource) => {
                        try {
                            await service.update({
                                id: this.id,
                                ...resource
                            });
                            await this.insertImage();
                            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                        } catch (err) {
                            this.rootStore.notificationStore.error('Error', err);
                        }
                    },
                    create: async (resource) => {
                        try {
                            await service.create({
                                charityId: charityId,
                                ...resource
                            });
                            await this.insertImage();
                            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
                        } catch (err) {
                            this.rootStore.notificationStore.error('Error', err);
                        }
                    }
                }
            },
            FormClass: CharityBankAccountEditForm,
            onAfterAction: () => this.getResource()
        });

        this.charityId = charityId;
        this.bankAccountModal = new ModalParams({});
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.user.list'
            )
        }
        else {
            this.form.clear();
            this.getResource();
        }
    }

    @action.bound
    async insertImage() {
        if (this.attachment != null) {
            try {
                const service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
                this.uploadLoading = true;
                const response = await service.uploadCharityBankAccount(this.attachment, this.charityId);
                this.uploadLoading = false;
                return response.data.id;
            }
            catch (err) {
                this.uploadLoading = false;
                this.rootStore.notificationStore.error('ERROR', err);
            }
        }
        return null;
    }

    @action.bound onAttachmentDrop(item) {
        this.attachment = item.affectedFiles[0].getRawFile();
        const binaryData = [];
        binaryData.push(this.attachment);
        this.image = window.URL.createObjectURL(new Blob(binaryData, { type: this.attachment.type }));
    }
}

export default CharityBankAccountEditViewStore;
