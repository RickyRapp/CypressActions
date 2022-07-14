import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore,TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { AcceptSecurityCreateForm } from 'application/charity/accept-security/forms';
import { ModalParams } from 'core/models';
import { t } from 'i18next';

@applicationContext
class AcceptSecurityCreateViewStore extends BaseEditViewStore {
    @observable addAnotherRecipientForm = null;
    @observable grantAcknowledgmentName = 'Development';
    @observable summaryInfo = false;
    @observable balance = 0;
    @observable availableBalance = 0;
    constructor(rootStore, { contributionStore }) {
        super(rootStore, {
            name: 'accept-security-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        try {
                            resource.paymentTypeId = await this.getPaymentTypeId();
                            resource.partyId = rootStore.userStore.applicationUser.id; //charityId
                            console.log("creating contribution...", resource);
                            const response = await contributionStore.createContribution(resource);
                            return response
                        } catch (error) {
                            console.log("error creating contribution...", error);

                        }
                    },
                };
            },
            FormClass: AcceptSecurityCreateForm,
            // onAfterAction: () => {
            //     this.nextStep();
            // },
        });
        this.createConfirmModalParams();
        this.createSecurityTypeDropdownStore();
        this.createBrokerageInstitutionDropdownStore();
        this.createRecentTransfersTableStore();
        this.setRecentTransfersTable();
        this.getAccountBalance();
    }

    async getAccountBalance(){
        this.balance = await this.rootStore.application.charity.charityStore.getCharityAvailableBalance(this.rootStore.userStore.user.charityId);
    }
    @action.bound
	async setRecentTransfersTable() {
        const params = {
			partyId: this.rootStore.userStore.applicationUser.id
		}
		params.embed = ['paymentTransaction'];
        console.log(params)
        var recentTransfers = await this.rootStore.application.donor.contributionStore.findContribution(params);
        recentTransfers = recentTransfers.item.slice(0,5);
		this.recentTransfersTableStore.setData(recentTransfers);
		if (!this.recentTransfersTableStore.dataInitialized) {
			this.recentTransfersTableStore.dataInitialized = true;
		}
	}
    createRecentTransfersTableStore() {
		this.recentTransfersTableStore = new TableViewStore(null, {
			columns: [
				{
					key: 'dateCreated',
					title: 'DONOR-DONOR.LIST.COLUMNS.DATE_CREATED_LABEL',
					format: {
						type: 'date',
						value: 'short',
					},
				},
				{
					key: 'amount',
					title: 'DONOR-DONOR.LIST.COLUMNS.AMOUNT_LABEL',
					format: {
						type: 'currency',
						value: '$',
					},
				},
			],
		});
	}
    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        } else {
            const profile = await this.rootStore.application.charity.charityStore.getCharityLoginProfile(this.rootStore.userStore.user.charityId);
            console.log(profile)
            this.balance = profile.presentBalance;
        }
    }
    @action.bound
    async onSubmitClick() {
        try {
            const { isValid } = await this.form.validate({ showErrors: true });
            if (isValid) {
                this.confirmModal.open({
                    onCancel: () => {
                        this.confirmModal.close();
                    },
                    form: this.form,
                    brokerageInstitution: this.brokerageInstitutionDropdownStore.value,
                    securityType: this.securityTypeDropdownStore.value,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getPaymentTypeId() {
        const lkp = await this.rootStore.application.lookup.paymentTypeStore.find();
        return lkp.find(p => p.abrv === 'stock-and-securities').id;
    }

    async getAccountTypeId() {
        const lkp = await this.rootStore.application.lookup.accountTypeStore.find();
        return lkp.find(p => p.abrv === 'regular').id;
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
}

export default AcceptSecurityCreateViewStore;
