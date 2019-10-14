import { action, runInAction } from 'mobx';
import { CharityEditForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityService } from 'application/charity/services';
import { LookupService } from 'common/services';

@applicationContext
class CharityEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'charity',
            id: id,
            autoInit: false,
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id) => {
                        const params = {
                            embed: [
                                'emailAddress',
                                'contactInformation',
                                'contactInformation.emailAddress',
                                'contactInformation.phoneNumber'
                            ]
                        }
                        const response = await service.get(id, params);
                        return response.data;
                    },
                    update: async (resource) => {
                        return await service.update(
                            {
                                id: id,
                                ...resource
                            });
                    }
                }
            },
            FormClass: CharityEditForm,
        });

        this.rootStore = rootStore;

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
            this.form.clear();
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
    async getResource(id) {
        await super.getResource(id);

        runInAction(() => {
            this.form.$('charityStatusId').set(this.item.charityStatusId);
            this.form.$('charityTypeId').set(this.item.charityTypeId);
            this.form.validate();
        });
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
}

export default CharityEditViewStore;
