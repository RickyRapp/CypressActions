import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorEditForm } from 'application/administration/donor/forms';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';
import moment from 'moment'
import _ from 'lodash'

@applicationContext
class DonorAccountInformationViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'general-data',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            actions: {
                get: async (id) => {
                    return this.rootStore.application.administration.donorStore.getDonor(
                        id,
                        {
                            fields: 'prefixTypeId,firstName,lastName,dateOfBirth,fundName,securityPin,accountType,accountManager,accountManagerId',
                            embed: 'accountManager,accountType'
                        });
                },
                update: async (resource) => {
                    await rootStore.application.administration.donorStore.updateGeneralData(resource);
                }
            },
            FormClass: DonorEditForm,
        });

        this.donorId = this.id;

        this.createAccountManagerDropdownStore();
        this.createMonthDropdownStore();
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
            const date = moment(this.item.dateOfBirth);
            this.form.$('month').set(_.find(this.monthDropdownStore.items, { id: (date.month()+1).toString() }).id);
            this.form.$('day').set(date.date());
            this.form.$('year').set(date.year());
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
                    const data = await this.rootStore.application.administration.donorStore.searchAccountManager({
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

    createMonthDropdownStore() {
		this.monthDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'January' },
					{ id: '2', name: 'February' },
					{ id: '3', name: 'March' },
					{ id: '4', name: 'April' },
					{ id: '5', name: 'May' },
					{ id: '6', name: 'June' },
					{ id: '7', name: 'July' },
					{ id: '8', name: 'August' },
					{ id: '9', name: 'September' },
					{ id: '10', name: 'October' },
					{ id: '11', name: 'November' },
					{ id: '12', name: 'December' },
				];
			},
		});
	}

}

export default DonorAccountInformationViewStore;
