import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { AcceptSecurityCreateForm } from 'application/charity/accept-security/forms';
import { ModalParams } from 'core/models';

@applicationContext
class AcceptSecurityCreateViewStore extends BaseEditViewStore {
    @observable addAnotherRecipientForm = null;
    @observable grantAcknowledgmentName = 'Development';
    @observable summaryInfo = false;
    @observable balance = 0;

    constructor(rootStore, { contributionStore }) {
        super(rootStore, {
            name: 'accept-security-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        debugger;
                        try {
                            resource.paymentTypeId = await this.getPaymentTypeId();
                            resource.partyId = rootStore.userStore.applicationUser.id; //charityId
                            console.log("creating contribution...", resource);
                            return contributionStore.createContribution(resource);
                        } catch (error) {
                            console.log("error creating contribution...", error);

                        }
                    },
                };
            },
            FormClass: AcceptSecurityCreateForm,
            onAfterAction: () => {
                this.nextStep();
            },
        });
        this.createConfirmModalParams();
        this.createSecurityTypeDropdownStore();
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
    async onSubmitClick() {
        const { isValid } = await this.form.validate({ showErrors: true });
        if (isValid) {
            console.log('modal for new contribution...');
            this.confirmModal.open({
                onCancel: () => {
                    this.confirmModal.close();
                },
                form: this.form,
                brokerageInstitution: this.brokerageInstitutionDropdownStore.value,
                securityType: this.securityTypeDropdownStore.value,
            });
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
