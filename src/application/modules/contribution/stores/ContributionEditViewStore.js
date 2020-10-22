import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { ContributionCreateForm } from 'application/contribution/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';
import { DonorBankAccountService } from 'application/donor/services';
import { ModalParams } from 'core/models';
import { ContributionService } from 'application/contribution/services';
import moment from 'moment';

@applicationContext
class ContributionEditViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable step = 2;
    donor = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution-create',
            id: rootStore.routerStore.routerState.params.editId,
            autoInit: false,
            actions: () => {
                const service = new ContributionService(rootStore.application.baasic.apiClient)
                return {
                    update: async (resource) => {
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
                        return service.update({ id: this.id, donorId: this.donorId, ...resource });
                    },
                    get: async (id) => {
                        const response = await service.getDetails(id, { embed: 'payerInformation,donorBankAccount,contributionStatus', donorId: this.donorId });
                        return {
                            ...response.data,
                            ...response.data.payerInformation
                        }

                    }
                }
            },
            FormClass: ContributionCreateForm,
            onAfterAction: () => {
                this.nextStep();
            }
        });

        this.hasAdministratorsPermission = this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read');

        this.routes = {
            allContributions: () => this.rootStore.routerStore.goTo('master.app.main.contribution.list')
        }

        if (!this.hasAdministratorsPermission) {
            this.donorId = rootStore.userStore.user.id;
        }
        else {
            this.donorId = rootStore.routerStore.routerState.queryParams.donorId;
        }

        this.bankAccountModal = new ModalParams({
            onClose: () => this.bankAccountModal.data = {}
        });
        this.confirmModal = new ModalParams({});
        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    this.paymentTypes = await this.rootStore.application.lookup.paymentTypeStore.find();
                    return this.paymentTypes;
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
            await this.fetch([
                super.getResource(this.id),
                this.setDonor()
            ])

            if (!this.hasAdministratorsPermission) {
                const dateToEdit = moment(this.item.dateCreated).add(15, 'm');
                if (!moment().isBetween(moment(this.item.dateCreated), dateToEdit)) {
                    this.rootStore.notificationStore.warning('ERROR_CODE.5005')
                    this.rootStore.routerStore.goBack();
                }
                if (!['pending', 'in-process'].includes(this.item.contributionStatus.abrv)) {
                    this.rootStore.notificationStore.warning('ERROR_CODE.5028')
                    this.rootStore.routerStore.goBack();
                }
            }
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
    async setDonor() {
        const service = new ContributionService(this.rootStore.application.baasic.apiClient)
        const response = await service.getDonorInformation(this.donorId);
        this.donor = response.data;
    }

    @action.bound
    async onSubmitClick() {
        const { isValid } = await this.form.validate({ showErrors: true });
        if (isValid) {
            this.confirmModal.open({
                onCancel: () => this.confirmModal.close(),
                form: this.form,
                paymentType: this.paymentTypes.find(c => c.id === this.form.$('paymentTypeId').value),
                bankAccount: this.bankAccountDropdownStore.items.find(c => c.id === this.form.$('donorBankAccountId').value)
            });
        }
    }

    @action.bound
    goBack() {
        this.rootStore.routerStore.goBack();
    }

    @action.bound
    onSelectPaymentType(id) {
        this.form.clear();
        this.bankAccountDropdownStore.onChange(null);
        this.form.$('paymentTypeId').set(id);
        const paymentType = this.paymentTypes.find(c => c.id === id);
        this.form.$('donorBankAccountId').setRequired(paymentType && paymentType.abrv === 'ach')
        this.form.$('checkNumber').setRequired(paymentType && paymentType.abrv === 'check')
        this.form.$('transactionId').setRequired(paymentType && paymentType.abrv === 'chase-quickpay')
        this.form.$('memo').setRequired(paymentType && paymentType.abrv === 'chase-quickpay')
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
                const lastBankAccountAdded = this.bankAccountDropdownStore.items[this.bankAccountDropdownStore.items.length - 1] //it's ordered by dateCreated when it's fetched
                this.form.$('donorBankAccountId').set(lastBankAccountAdded.id);
                this.bankAccountModal.close();
            }
        })
    }
}

export default ContributionEditViewStore;
