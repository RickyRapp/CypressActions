import { action, runInAction } from 'mobx';
import { SelectTableWithRowDetailsViewStore, BasePreviewViewStore, BaasicDropdownStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { applicationContext } from 'core/utils';
import { LookupService } from 'common/services';
import { DonationReviewForm } from 'application/donation/forms';
import _ from 'lodash';

@applicationContext
class DonationReviewViewStore extends BasePreviewViewStore {
    statusId = null;
    paymentTypes = null;
    donationTypes = null;

    form = new DonationReviewForm({
        onSuccess: async form => {
            const item = form.values();
            if (!item.grantIds && !item.sessionIds) {
                this.rootStore.notificationStore.warning('DONATION.REVIEW.SELECT_DONATIONS_WARNING')
                return;
            }
            if (item.paymentTypeId === '-1') {
                item.paymentTypeId = null;
            }
            await this.service.review({ ...item });
            this.rootStore.routerStore.goBack();
        }
    });

    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        const service = new DonationService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'donation',
            id: id,
            autoInit: false,
            routes: {
                editGrant: (donorAccountId, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.grant.edit',
                        {
                            id: donorAccountId,
                            editId: editId
                        }
                    );
                },
            },
            actions: () => {
                return {
                    get: async (id) => {
                        const response = await service.findOverview({ id: id, statusId: this.statusId });
                        return response.data;
                    }
                }
            }
        });
        this.service = service;
        this.form.$('charityId').set(id);

        this.tableStore = new SelectTableWithRowDetailsViewStore(null, {
            columns: [
                {
                    key: 'totalAmountPerType',
                    title: 'SCHEDULED_SETTING.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    },
                },
                {
                    key: 'donationType.name',
                    title: 'SCHEDULED_SETTING.LIST.COLUMNS.TYPE_LABEL'
                }
            ],
            actions: {},
            onSetSelectedItems: this.setSelectedItems,
            selectedField: 'selected'
        });

        this.paymentTypeDropdownStore = new BaasicDropdownStore(null, {
            onChange: () => {
                this.form.$('addressLine1').clear();
                this.form.$('addressLine2').clear();
                this.form.$('city').clear();
                this.form.$('state').clear();
                this.form.$('zipCode').clear();
                this.form.$('bankAccountId').clear();
                this.form.$('addressLine1').setRequired(false);
                this.form.$('city').setRequired(false);
                this.form.$('state').setRequired(false);
                this.form.$('zipCode').setRequired(false);
                this.form.$('bankAccountId').setRequired(false);
                this.form.$('paymentTypeId').setRequired(true);
                this.form.$('paymentNumber').setRequired(true);
                if (this.paymentTypeDropdownStore.value.abrv === 'check') {
                    this.form.$('addressLine1').setRequired(true);
                    this.form.$('city').setRequired(true);
                    this.form.$('state').setRequired(true);
                    this.form.$('zipCode').setRequired(true);
                    const address = _.find(this.item.charityAddresses, { isPrimary: true });
                    this.form.$('addressLine1').set(address.addressLine1);
                    this.form.$('city').set(address.city);
                    this.form.$('state').set(address.state);
                    this.form.$('zipCode').set(address.zipCode);
                }
                else if (this.paymentTypeDropdownStore.value.abrv === 'ach') {
                    this.form.$('bankAccountId').setRequired(true);
                    this.form.$('bankAccountId').set(this.item.charityBankAccounts[0].id);
                }
                else if (this.paymentTypeDropdownStore.value.abrv === 'transfer-to-charity-account') {
                    this.form.$('paymentTypeId').setRequired(false);
                    this.form.$('paymentNumber').setRequired(false);
                }
            }
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetchDonationStatuses();
            await this.fetch([this.getResource(this.id)]);
            await this.fetchPaymentTypes();
            await this.fetchDonationTypes();
            this.tableStore.setData(this.item.donations)
        }
    }

    @action.bound
    setSelectedItems(selectedItems) {
        let donationGrantIds = [];
        let donationSessionIds = [];
        if (selectedItems.length > 0) {
            donationGrantIds = _.join(_.map(_.filter(selectedItems, function (params) {
                return params.donationType.abrv === 'combined-grant' || params.donationType.abrv === 'grant'
            }), 'id'), ',');
            donationSessionIds = _.join(_.map(_.filter(selectedItems, function (params) {
                return params.donationType.abrv === 'session'
            }), 'id'), ',');
        }
        this.form.$('grantIds').set(donationGrantIds);
        this.form.$('sessionIds').set(donationSessionIds);
    }

    @action.bound
    async fetchDonationStatuses() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'donation-status');
        const response = await service.getAll();
        this.statusId = _.find(response.data, { abrv: 'pending' }).id;
    }

    @action.bound
    async fetchDonationTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'donation-type');
        const response = await service.getAll();
        this.donationTypes = response.data;
    }

    @action.bound
    async fetchPaymentTypes() {
        this.paymentTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'payment-type');
        const response = await service.getAll();
        this.paymentTypes = response.data;
        const availableStatuses = this.getDefaults();
        runInAction(() => {
            this.paymentTypeDropdownStore.setItems(availableStatuses);
            this.paymentTypeDropdownStore.setLoading(false);
        });
    }

    getDefaults() {
        let availableStatuses = [];
        availableStatuses.push(_.find(this.paymentTypes, { abrv: 'check' }));
        availableStatuses.push(_.find(this.paymentTypes, { abrv: 'bill-pay' }))
        if (this.item.charityBankAccounts && this.item.charityBankAccounts.length > 0) {
            availableStatuses.push(_.find(this.paymentTypes, { abrv: 'ach' }))
        }
        availableStatuses.push({ id: '-1', name: 'Transfer to charity account', abrv: 'transfer-to-charity-account' });
        return availableStatuses;
    }
}

export default DonationReviewViewStore;
