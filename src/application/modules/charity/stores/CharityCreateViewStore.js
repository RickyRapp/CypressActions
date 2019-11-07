import { action, runInAction, observable } from 'mobx';
import { CharityCreateForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityService } from 'application/charity/services';
import { LookupService, CharityFileStreamService } from 'common/services';

const ErrorType = {
    Unique: 0
};

@applicationContext
class CharityCreateViewStore extends BaseEditViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];

    constructor(rootStore) {
        const service = new CharityService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'charity',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        await this.fetch([
                            this.usernameExists(resource.coreUser.username),
                            this.taxIdExists(resource.taxId),
                        ])
                        if (!this.form.isValid) {
                            throw { type: ErrorType.Unique };
                        }
                        try {
                            const response = await service.create(resource);
                            await this.insertImage(response.data.response);
                        } catch (err) {
                            this.form.invalidate(err.data);
                            throw { error: err };
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
                            rootStore.notificationStore.success('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: CharityCreateForm,
        });

        this.service = service;
        this.charityTypeDropdownStore = new BaasicDropdownStore();
        this.charityStatusDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchCharityTypes(),
                this.fetchCharityStatuses()
            ]);
        }
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
    async fetchCharityTypes() {
        this.charityTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-type');
        const response = await service.getAll();
        runInAction(() => {
            this.charityTypeDropdownStore.setItems(response.data);
            this.charityTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchCharityStatuses() {
        this.charityStatusDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-status');
        const response = await service.getAll();
        runInAction(() => {
            this.charityStatusDropdownStore.setItems(response.data);
            this.charityStatusDropdownStore.setLoading(false);
        });
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
