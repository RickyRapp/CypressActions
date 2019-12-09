import { action, observable } from 'mobx';
import { CharityCreateForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { LookupService, CharityFileStreamService } from 'common/services';

const ErrorType = {
    Unique: 0
};

class CharityCreateViewStore extends BaseEditViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];
    @observable loginShow = false;
    @observable bankAccountShow = false;

    constructor(rootStore) {
        const service = new CharityService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'charity',
            id: undefined,
            actions: () => {
                return {
                    create: async (item) => {
                        await this.fetch([
                            this.usernameExists(item.coreUser.username),
                            this.taxIdExists(item.taxId)
                        ])
                        if (item.coreUser.username || item.coreUser.coreMembership.password || item.coreUser.coreMembership.confirmPassword) {
                            if (!item.coreUser.username) {
                                this.form.$('coreUser.username').invalidate('The Username is required if you want create online account.')
                            }
                            if (!item.coreUser.coreMembership.password) {
                                this.form.$('coreUser.coreMembership.password').invalidate('The Password is required if you want create online account.')
                            }
                            if (!item.coreUser.coreMembership.confirmPassword) {
                                this.form.$('coreUser.coreMembership.confirmPassword').invalidate('The Confirm password is required if you want create online account.')
                            }
                        }
                        else {
                            item.coreUser = null;
                        }
                        if (item.bankAccount.name || item.bankAccount.accountNumber || item.bankAccount.routingNumber) {
                            if (!item.bankAccount.name) {
                                this.form.$('bankAccount.name').invalidate('The Name is required if you want create bank account.')
                            }
                            if (!item.bankAccount.accountNumber) {
                                this.form.$('bankAccount.accountNumber').invalidate('The Account number is required if you want create bank account.')
                            }
                            if (!item.bankAccount.routingNumber) {
                                this.form.$('bankAccount.routingNumber').invalidate('The routing number is required if you want create bank account.')
                            }
                        }
                        else {
                            item.bankAccount = null;
                        }
                        if (!this.form.isValid) {
                            throw { type: ErrorType.Unique };
                        }
                        try {
                            const response = await service.create(item);
                            await this.insertImage(response.data.response);
                        } catch (err) {
                            rootStore.notificationStore.error('ERROR', err);
                        }
                    }
                }
            },
            errorActions: {
                onCreateError: ({ type }) => {
                    switch (type) {
                        case ErrorType.Unique:
                            break;
                        default:
                            rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: CharityCreateForm,
        });

        this.service = service;
        this.charityTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-type');
                const response = await service.getAll();
                return response.data;
            }
        });
        this.charityStatusDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-status');
                const response = await service.getAll();
                return response.data;
            }
        });
    }

    @action.bound
    onChangeLoginShow(visiblity) {
        this.loginShow = visiblity;
    }

    @action.bound
    onChangeBankAccountShow(visiblity) {
        this.bankAccountShow = visiblity;
    }

    @action.bound
    onBlurUsername(event) {
        this.usernameExists(event.target ? event.target.value : null)
    }

    @action.bound
    async usernameExists(username) {
        if (this.form.$('coreUser.username').isValid) {
            try {
                const response = await this.rootStore.application.baasic.membershipModule.user.exists(username);
                if (response.statusCode === 204) {
                    this.form.$('coreUser.username').invalidate('Username already exists.')
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.form.$('coreUser.username').resetValidation();
                    return;
                }
            }
        }
    }

    @action.bound
    async taxIdExists(taxId) {
        this.form.$('taxId').validate();
        if (this.form.$('taxId').isValid) {
            try {
                const response = await this.service.taxIdExists(taxId);
                if (response.statusCode === 204) {
                    this.form.$('taxId').invalidate('Tax Id already exists.')
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.form.$('taxId').resetValidation();
                    return;
                }
            }
        }
    }

    @action.bound
    async insertImage(charityId) {
        if (this.attachment != null) {
            try {
                var service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
                this.uploadLoading = true;
                const response = await service.uploadCharityBankAccount(this.attachment, charityId);
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

export default CharityCreateViewStore;
