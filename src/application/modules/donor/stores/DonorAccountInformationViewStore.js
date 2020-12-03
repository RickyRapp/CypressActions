import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorEditForm } from 'application/donor/forms';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAccountInformationViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        super(rootStore, {
            name: 'general-data',
            id: donorId,
            autoInit: false,
            actions: {
                get: async (id) => {
                    return rootStore.application.donor.donorStore.getDonor(
                        id,
                        {
                            fields: 'prefixTypeId,firstName,lastName,dateOfBirth,fundName,securityPin,accountManager,accountManagerId',
                            embed: 'accountManager'
                        });
                },
                update: async (resource) => {
                    await rootStore.application.donor.donorStore.updateGeneralData(resource);
                }
            },
            FormClass: DonorEditForm,
        });

        this.createAccountManagerDropdownStore();
        this.createPrefixTypeDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([this.getResource(this.id)]);

            if (this.item && this.item.accountManager) {
                this.accountManagerDropdownStore.setValue({
                    id: this.item.accountManager.userId,
                    name: `${this.item.accountManager.firstName} ${this.item.accountManager.lastName}`,
                })
            }
        }
    }

    createAccountManagerDropdownStore() {
        this.accountManagerDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONOR.ACCOUNT_INFORMATION_FIELDS.SELECT_ACCOUNT_MANAGER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.donor.donorStore.searchAccountManager({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc'
                    });
                    return data.item.map(c => {
                        return {
                            id: c.userId,
                            name: `${c.firstName} ${c.lastName}`,
                        }
                    });
                }
            });
    }

    createPrefixTypeDropdownStore() {
        this.prefixTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.prefixTypeStore.find();
            }
        });
    }
}

export default DonorAccountInformationViewStore;
