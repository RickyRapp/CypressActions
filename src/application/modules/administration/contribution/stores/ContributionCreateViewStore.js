import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { ContributionCreateForm } from 'application/administration/contribution/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import _ from 'lodash';

@applicationContext
class ContributionCreateViewStore extends BaseEditViewStore {
    @observable paymentTypes = [];
    @observable step = 1;
    donor = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: (resource) => {
                        if (!resource.isThirdParty) {
                            resource.name = this.donor.donorName;
                            resource.addressLine1 = this.donor.donorAddress.addressLine1;
                            resource.addressLine2 = this.donor.donorAddress.addressLine2;
                            resource.city = this.donor.donorAddress.city;
                            resource.state = this.donor.donorAddress.state;
                            resource.zipCode = this.donor.donorAddress.zipCode;
                            resource.email = this.donor.donorEmailAddress.email;
                            resource.number = this.donor.donorPhoneNumber.number;
                        }
                        return rootStore.application.donor.contributionStore.createContribution({ donorId: this.donorId, ...resource });
                    }
                }
            },
            FormClass: ContributionCreateForm,
            onAfterAction: () => {
                this.nextStep();
            }
        });

        this.routes = {
            allContributions: () => {
                this.rootStore.routerStore.goTo('master.app.main.administration.contribution.list');
            }
        }

        this.donorId = rootStore.routerStore.routerState.params.id;

        this.createBankAccountModalParams();
        this.createConfirmModalParams();
        this.createPaymentTypeDropdownStore();
        this.createBankAccountDropdownStore();
        this.createPreviousContributionsTableStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
            this.donor = await this.rootStore.application.donor.contributionStore.getDonorInformation(this.donorId);
            this.previousContributionsTableStore.setData(this.donor.previousContributions);
            if (!this.previousContributionsTableStore.dataInitialized) {
                this.previousContributionsTableStore.dataInitialized = true;
            }

            if (!this.donor.isInitialContributionDone) {
                this.form.$('amount').set('rules', `required|numeric|min:${this.donor.contributionMinimumInitialAmount}`);
            }
        }
    }

    @action.bound
    async onSubmitClick() {
        const { isValid } = await this.form.validate({ showErrors: true });
        if (isValid) {
            this.confirmModal.open({
                onCancel: () => {
                    this.confirmModal.close();
                },
                form: this.form,
                paymentType: this.paymentTypes.find(c => c.id === this.form.$('paymentTypeId').value),
                bankAccount: this.bankAccountDropdownStore.items.find(c => c.id === this.form.$('donorBankAccountId').value)
            });
        }
    }

    @action.bound
    onSelectPaymentType(id) {
        this.form.clear();
        this.bankAccountDropdownStore.onChange(null);
        this.form.$('paymentTypeId').set(id);
        const paymentType = this.paymentTypes.find(c => c.id === id);
        this.form.$('donorBankAccountId').setRequired(paymentType && paymentType.abrv === 'ach')
        this.form.$('checkNumber').setRequired(paymentType && paymentType.abrv === 'check')
        if (this.donor.isInitialContributionDone) {
            const json = JSON.parse(paymentType.json);
            this.form.$('amount').set('rules', `required|numeric|min:${json.minimumDeposit}`);
        }
        this.nextStep(2);
    }

    @action.bound
    nextStep(step) {
        if (step)
            this.step = step;
        else
            this.step = this.step + 1;
    }

    @action.bound
    onAddBankAccountClick() {
        this.bankAccountModal.open({
            donorId: this.donorId,
            onAfterAction: async () => {
                await this.bankAccountDropdownStore.filterAsync(null);
                const sorted = _.orderBy(this.bankAccountDropdownStore.items, ['dateCreated'], ['desc'])
                this.form.$('donorBankAccountId').set(sorted[0].id);
                this.bankAccountModal.close();
            }
        })
    }

    createBankAccountModalParams() {
        this.bankAccountModal = new ModalParams({
            onClose: () => { this.bankAccountModal.data = {}; }
        });
    }

    createConfirmModalParams() {
        this.confirmModal = new ModalParams({});
    }

    createPaymentTypeDropdownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const tempTypes = await this.rootStore.application.lookup.paymentTypeStore.find();
                    this.paymentTypes = tempTypes.filter(c => { return c.abrv !== 'bill-pay' })
                    return this.paymentTypes;
                }
            });
    }

    createBankAccountDropdownStore() {
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    let params = {
                        embed: ['accountHolder'],
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    params.donorId = this.donorId;
                    return this.rootStore.application.donor.contributionStore.findBankAccount(params);
                }
            });
    }

    createPreviousContributionsTableStore() {
        this.previousContributionsTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'amount',
                    title: 'CONTRIBUTION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ]
        });
    }

}

export default ContributionCreateViewStore;
