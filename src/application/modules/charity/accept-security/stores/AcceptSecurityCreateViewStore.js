import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores'; //TableViewStore
import { applicationContext, donorFormatter } from 'core/utils';
import { AcceptSecurityCreateForm } from 'application/charity/accept-security/forms';
import { ModalParams } from 'core/models';

@applicationContext
class AcceptSecurityCreateViewStore extends BaseEditViewStore {
	@observable addAnotherRecipientForm = null;
	@observable grantAcknowledgmentName  = 'Development';
	@observable summaryInfo = false;
    @observable balance = 0;
    @observable donor = null;

	constructor(rootStore) {
		super(rootStore, {
			name: 'accept-security-create',
			id: undefined,
			autoInit: false,
			actions: () => {
				return {
					create: async (resource) => {
                        // eslint-disable-next-line
                        console.log(resource);
					},
				};
			},
			FormClass: AcceptSecurityCreateForm,
			onAfterAction: () => {
                this.confirmModal.close();
			},
		});
        this.createConfirmModalParams();
        this.createSecurityTypeDropdownStore();
		this.createDonorSearchDropdownStore();
        this.createBrokerageInstitutionDropdownStore();
	}

	@action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		} else {
            const profile = await this.rootStore.application.charity.charityStore.getCharityLoginProfile(this.rootStore.userStore.user.charityId);
            this.balance = profile.presentBalance;
		}
	}
    @action.bound
    onSubmitClick() {
        this.confirmModal.open({
            onCancel: () => {
                this.confirmModal.close();
            },
            form: this.form,
            brokerageInstitution: this.brokerageInstitutionDropdownStore.value,
            securityType: this.securityTypeDropdownStore.value,
            searchDonorDropdownStore: this.searchDonorDropdownStore.value
        });
    }
    createConfirmModalParams() {
		this.confirmModal = new ModalParams({});
	}
    createSecurityTypeDropdownStore() {
		this.securityTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'Stocks' },
					{ id: '2', name: 'Mutual Funds' },
					{ id: '3', name: 'Bonds' },
					{ id: '4', name: 'Other' },
				];
			},
		});
	}
    createBrokerageInstitutionDropdownStore() {
		this.brokerageInstitutionDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'Fidelity Investment' },
					{ id: '2', name: 'Charles Schwab' },
					{ id: '3', name: 'Vanguard' },
					{ id: '4', name: 'Goldman Sachs' },
					{ id: '5', name: 'E - Trade' },
					{ id: '6', name: 'TD Ameritrade ' },
					{ id: '7', name: 'Merrill Lynch' },
					{ id: '8', name: 'Interactive Brokers LLC' },
					{ id: '9', name: 'JP Morgan ' },
					{ id: '10', name: 'Morgan Stanley' },
					{ id: '11', name: 'Other' },
				];
			},
		});
	}
	createDonorSearchDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: true,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.charity.donorStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses',
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (this.rootStore.routerStore.routerState.queryParams && this.rootStore.routerStore.routerState.queryParams.donorId) {
                        const id = this.rootStore.routerStore.routerState.queryParams.donorId;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAddresses',
                            ]
                        }
                        const data = await this.rootStore.application.charity.donorStore.getDonor(id, params);
                        this.donor = donorFormatter.format(data, { type: 'donor-name', value: 'dropdown' });
                        return { id: data.id, name: donorFormatter.format(data, { type: 'donor-name', value: 'dropdown' }) };
                    }
                    else {
                        return null;
                    }
                },
                onChange: async (donorId) => {
                    // eslint-disable-next-line
                    console.log(donorId);
                }
            });
    }

}

export default AcceptSecurityCreateViewStore;
