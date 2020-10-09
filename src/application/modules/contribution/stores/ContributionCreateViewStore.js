import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { LookupService } from 'common/services';
import { ContributionCreateForm } from 'application/contribution/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';
import { DonorBankAccountService, DonorService } from 'application/donor/services';
import { ModalParams } from 'core/models';
import { ContributionService } from 'application/contribution/services';

@applicationContext
class ContributionCreateViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable step = 1;
    donor = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
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
                        return this.service.create({ donorId: this.donorId, ...resource });
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
                this.rootStore.routerStore.goTo('master.app.main.contribution.list');
            }
        }

        this.service = new ContributionService(this.rootStore.application.baasic.apiClient)

        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
            this.donorId = rootStore.userStore.user.id;
        }
        else {
            this.donorId = rootStore.routerStore.routerState.params.id;
        }

        this.bankAccountModal = new ModalParams({
            onClose: () => {
                this.bankAccountModal.data = {};
            }
        });
        this.confirmModal = new ModalParams({});
        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'payment-type');
                    const response = await service.getAll();
                    this.paymentTypes = response.data;
                    return response.data;
                }
            });

        const bankAccountService = new DonorBankAccountService(rootStore.application.baasic.apiClient);
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    let params = {
                        embed: ['accountHolder'],
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                        params.donorId = this.donorId;
                    }
                    else {
                        params.userId = this.donorId;
                    }
                    const response = await bankAccountService.find(params);
                    return response.data.item;
                }
            });

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

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
            const response = await this.service.getDonorInformation(this.donorId);
            this.donor = response.data;
            this.previousContributionsTableStore.setData(this.donor.previousContributions);

            if (this.donor.isInitialContributionDone) {
                this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.donor.contributionMinimumAdditionalAmount}`);
            }
            else {
                this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.donor.contributionMinimumInitialAmount}`);
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
                bankAccount: this.bankAccountDropdownStore.items.find(c => c.id === this.form.$('bankAccountId').value)
            });
        }
    }

    @action.bound
    onSelectPaymentType(id) {
        this.form.clear();
        this.bankAccountDropdownStore.onChange(null);
        this.form.$('paymentTypeId').set(id);
        this.form.$('paymentTypeId').resetValidation()
        this.form.$('paymentTypeId').setDisabled(true);
        const paymentType = this.paymentTypes.find(c => c.id === id);
        this.form.$('bankAccountId').setRequired(paymentType && paymentType.abrv === 'ach')
        this.form.$('checkNumber').setRequired(paymentType && paymentType.abrv === 'check')
        this.form.$('transactionId').setRequired(paymentType && paymentType.abrv === 'chase-quickpay')
        this.form.$('memo').setRequired(paymentType && paymentType.abrv === 'chase-quickpay')
        this.nextStep(2);
    }

    @action.bound
    nextStep(step) {
        if (step) {
            this.step = step;
        }
        else {
            this.step = this.step + 1;
        }
    }

    @action.bound
    onAddBankAccountClick() {
        this.bankAccountModal.open({
            donorId: this.donorId,
            onAfterAction: async () => {
                await this.bankAccountDropdownStore.filterAsync(null);
                const lastBankAccountAdded = this.bankAccountDropdownStore.items[this.bankAccountDropdownStore.items.length - 1] //it's ordered by dateCreated when it's fetched
                this.form.$('bankAccountId').set(lastBankAccountAdded.id);
                this.bankAccountModal.close();
            }
        })
    }
}

export default ContributionCreateViewStore;
