import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { BankAccountService } from 'common/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { CharityBankAccountEditForm } from 'application/charity/forms';
import { CharityFileStreamService } from 'common/services';

@applicationContext
class CharityBankAccountEditViewStore extends BaseEditViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];
    bankAccountService = null;

    constructor(rootStore, { id, charityId }) {
        super(rootStore, {
            name: 'charity-bank-account',
            id: id,
            actions: () => {
                const service = new BankAccountService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id) => {
                        const params = {
                            embed: ['accountHolder', 'accountHolder.address', 'accountHolder.emailAddress']
                        }
                        const response = await service.get(id, params);
                        return response.data;
                    },
                    update: async (resource) => {
                        try {
                            const response = await service.update(resource);
                            await this.insertImage();
                            return response;
                        } catch (err) {
                            this.form.invalidate(err.data);
                            throw { error: err };
                        }
                    }
                }
            },
            FormClass: CharityBankAccountEditForm,
        });

        this.charityId = charityId;
        this.id = id;
        this.bankAccountModal = new ModalParams({});
    }

    @action.bound
    async insertImage() {
        if (this.attachment != null) {
            try {
                var service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
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

    @action.bound async onAttachmentDrop(item) {
        this.attachment = item.affectedFiles[0].getRawFile();
        const binaryData = [];
        binaryData.push(this.attachment);
        this.image = window.URL.createObjectURL(new Blob(binaryData, { type: this.attachment.type }));
    }
}

export default CharityBankAccountEditViewStore;
