import { action, runInAction, observable } from 'mobx';
import { CharityCreateForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityService } from 'application/charity/services';
import { LookupService, CharityFileStreamService } from 'common/services';

@applicationContext
class CharityCreateViewStore extends BaseEditViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];

    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'charity',
            id: id,
            autoInit: false,
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id, opts) => {
                        const response = await service.get(id, opts);
                        return response.data;
                    },
                    create: async (resource) => {
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
            FormClass: CharityCreateForm,
        });

        this.charityTypeDropdownStore = new BaasicDropdownStore(null, null,
            {
                onChange: (charityTypeId) => {
                    this.item.charityTypeId = charityTypeId;
                    this.form.set({ charityTypeId: charityTypeId });
                }
            });

        this.charityStatusDropdownStore = new BaasicDropdownStore(null, null,
            {
                onChange: (charityStatusId) => {
                    this.item.charityStatusId = charityStatusId;
                    this.form.set({ charityStatusId: charityStatusId });
                }
            });
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
            await this.fetch([
                this.getResource(this.id)
            ]);
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
