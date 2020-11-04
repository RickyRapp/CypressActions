import { CharityEditForm, CharityOnlineAccountForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityGeneralDataViewStore extends BaseEditViewStore {
    applicationDefaultSetting = null;
    charityAccountTypes = null;

    constructor(rootStore, props) {
        super(rootStore, {
            name: 'charity',
            id: props.charityId,
            autoInit: false,
            actions: () => {
                return {
                    get: async (id) => {
                        const params = {
                            embed: ['contactInformation']
                        }
                        const data = await this.rootStore.application.charity.charityStore.getCharity(id, params);
                        return {
                            name: data.name,
                            taxId: data.taxId,
                            charityStatusId: data.charityStatusId,
                            charityTypeId: data.charityTypeId,
                            contactInformationName: data.contactInformation.name,
                            contactInformationName: data.contactInformation.email,
                            contactInformationName: data.contactInformation.number

                        }
                    },
                    update: async (resource) => {
                        await this.rootStore.application.charity.charityStore.updateCharity(resource);
                    }
                }
            },
            FormClass: CharityEditForm,
            onAfterAction: () => { this.getResource(this.id); }
        });
        this.createCharityTypeDropdownStore();
        this.createCharityStatusDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.loadLookups(),
                this.getResource(this.id)
            ]);
        }
    }

    async loadLookups() {
        this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
    }

    createCharityStatusDropdownStore() {
        this.charityStatusDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.charityStatusStore.find();
                }
            });
    }

    createCharityTypeDropdownStore() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.charityTypeStore.find();
                }
            });
    }
}

export default CharityGeneralDataViewStore;
