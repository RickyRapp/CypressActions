import { action, observable } from 'mobx';
import { BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore, SelectTableViewStore } from 'core/stores';
import { applicationContext, donorFormatter, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { ModalParams } from 'core/models';
import { ContributionListFilter } from 'application/administration/contribution/models';
import moment from 'moment';
import { saveAs } from '@progress/kendo-file-saver';

@applicationContext
class ContributionViewStore extends BaseListViewStore {
    contributionStatuses = [];
    @observable selectedItemsSum = 0;
    @observable achBatchCurrentNumber = false;

    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution',
            authorization: 'theDonorsFundContributionSection',
            routes: {
                edit: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.contribution.edit', { id: id });
                },
                create: () => {
                    this.openSelectDonorModal();
                },
                preview: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.contribution.details', { id: id });
                },
            },
            queryConfig: {
                filter: new ContributionListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.searchDonorDropdownStore.setValue(null);
                    this.paymentTypeDropdownStore.setValue(null);
                    this.contributionStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        this.selectedItemsSum = 0;
                        if(params.dateCreatedFrom){
                            let fromDate = params.dateCreatedFrom.replace(' 00:00:00','');
                            params.dateCreatedFrom = `${fromDate} 00:00:00`;
                        }
                        if(params.dateCreatedTo){
                            let toDate = params.dateCreatedTo.replace(' 23:59:59','');
                            params.dateCreatedTo = `${toDate} 23:59:59`;
                        }
                        params.embed = [
                            'donor',
                            'payerInformation',
                            'bankAccount',
                            'paymentType',
                            'contributionStatus',
                            'bankAccount.accountHolder'
                        ];
                        this.achBatchCurrentNumber = await rootStore.application.administration.contributionStore.achBatchCurrentNumber({ increment: false });
                        return rootStore.application.administration.contributionStore.findContribution(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createDonorSearch();
        this.createContributionStatusDropodownStore();
        this.createPaymentTypeDropodownStore();

        this.selectDonorModal = new ModalParams({});
        this.reviewModal = new ModalParams({});
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.contribution.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.contribution.create', { id: donorId })
            }
        );
    }

    @action.bound
    onClickDonorFromFilter(donorId) {
        this.rootStore.routerStore.goTo('master.app.main.administration.contribution.create', { id: donorId })
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => { this.reviewModal.close(); this.queryUtility.fetch(); }
        });
    }

    @action.bound
    renderPaymentType(item) {
        if (item.paymentType.abrv === 'ach' || item.paymentType.abrv === 'wire-transfer') {
            if (item.bankAccount) {
                return `${item.paymentType.name}${' ...' + item.bankAccount.accountNumber}`;
            }
        }
        return item.paymentType.name;
    }

    @action.bound
    async openCancelContribution(item) {
        const pageNumber = this.tableStore.pageNumber;

        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to cancel contribution (#${item.confirmationNumber}) created 
            on: ${moment(item.dateCreated).format('dddd, MMMM Do YYYY, h:mm:ss A')} with amount: $${item.amount.toFixed(2)}`,
            async () => {
                this.loaderStore.suspend();
                try {
                    await this.rootStore.application.administration.contributionStore.reviewContribution({ id: item.id, contributionStatusId: this.contributionStatuses.find(c => c.abrv === 'canceled').id });
                    this.queryUtility.changePage(pageNumber);
                    this.rootStore.notificationStore.success('Contribution canceled');
                }
                catch (err) {
                    this.rootStore.notificationStore.error('Failed to cancel contribution');
                }
                finally {
                    this.loaderStore.resume();
                }
            }
        )
    }

    @action.bound
    async openReviewContribution(item) {
        const pageNumber = this.tableStore.pageNumber;

        let message = 'You are about to set contribution to '
        let newStatusId = null;
        if (item.contributionStatusId === this.contributionStatuses.find(c => c.abrv === 'pending').id) {
            newStatusId = this.contributionStatuses.find(c => c.abrv === 'in-process').id;
            message += 'in-process'
        }
        else if (item.contributionStatusId === this.contributionStatuses.find(c => c.abrv === 'in-process').id) {
            newStatusId = this.contributionStatuses.find(c => c.abrv === 'funded').id;
            message += 'funded'
        }
        else if (item.contributionStatusId === this.contributionStatuses.find(c => c.abrv === 'funded').id) {
            newStatusId = this.contributionStatuses.find(c => c.abrv === 'declined').id;
            message += 'declined'
        }
        else {
            return;
        }

        message += ' status';

        this.rootStore.modalStore.showConfirm(
            message,
            async () => {
                this.loaderStore.suspend();
                try {
                    await this.rootStore.application.administration.contributionStore.reviewContribution({ id: item.id, contributionStatusId: newStatusId });
                    this.queryUtility.changePage(pageNumber);
                    this.rootStore.notificationStore.success('Contribution reviewed.');
                }
                catch (err) {
                    this.rootStore.notificationStore.error('Failed to review contribution');
                }
                finally {
                    this.loaderStore.resume();
                }
            }
        )
    }

    createTableStore() {
        this.setTableStore(new SelectTableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true
                },
                {
                    key: 'amount',
                    title: 'CONTRIBUTION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'CONTRIBUTION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'contributionStatus.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.CONTRIBUTION_STATUS_NAME_LABEL',
                },
                {
                    key: 'paymentType.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYMENT_TYPE_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: this.renderPaymentType
                    }
                },
                {
                    key: 'payerInformation.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYER_INFORMATION_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.bankAccount && item.bankAccount.isThirdPartyAccount && item.bankAccount.accountHolder ? item.bankAccount.accountHolder.name : item.thirdPartyDonorAdvisedFundId && item.thirdPartyDonorAdvisedFundId != "" ? (this.thirdPartyFunds.find(c => c.id == item.thirdPartyDonorAdvisedFundId)).name : item.paymentType && item.paymentType.abrv == 'credit-card' ? 'PayPal Giving' : item.payerInformation.name;
                        }
                    }
                },
                {
                    key: 'checkNumber',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYMENT_NUMBER_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (contribution) => this.routes.edit(contribution.id, contribution.donorId),
                onCancel: (contribution) => this.openCancelContribution(contribution),
                onReview: (contribution) => this.openReviewContribution(contribution),
                onPreview: (contribution) => this.routes.preview(contribution.id, contribution.donorId),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    return item.contributionStatus.abrv === 'pending' || item.contributionStatus.abrv === 'in-process';
                },
                onCancelRender: (item) => {
                    return item.contributionStatus.abrv === 'pending' || item.contributionStatus.abrv === 'in-process';
                },
                onReviewRender: (item) => {
                    return ['pending', 'in-process', 'funded'].includes(item.contributionStatus.abrv);
                }
            },
            onSelect: (dataItem, isRemoving) => {
                if(dataItem.contributionStatus.abrv === 'pending' && dataItem.paymentType.abrv === 'ach'){
                    if(isRemoving){
                        this.selectedItemsSum -= dataItem.amount;
                    }else{
                        this.selectedItemsSum += dataItem.amount;
                    }
                }
            },
            onSelectAll: (e) => {
                if(!this.tableStore.hasSelectedItems){
                    this.tableStore.data.map(item => {
                        if(item.contributionStatus.abrv === 'pending' && item.paymentType.abrv === 'ach'){
                            this.selectedItemsSum += item.amount;
                        }
                    });
                }else{
                    this.selectedItemsSum = 0;
                }
            }
        }));
    }

    createDonorSearch() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'CONTRIBUTION.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: true,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    if (isNullOrWhiteSpacesOrUndefinedOrEmpty(searchQuery)) {
                        return [];
                    }
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
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
                    return data.item.map(c => {
                        return {
                            id: c.id,
                            name: donorFormatter.format(c, { type: 'donor-name', value: 'dropdown' })
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
                        const data = await this.rootStore.application.administration.donorStore.getDonor(id, params);
                        return {
                            id: data.id,
                            name: donorFormatter.format(data, { type: 'donor-name', value: 'dropdown' })
                        }
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter.donorId = donorId;
                }
            });
    }

    createContributionStatusDropodownStore() {
        this.contributionStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    this.contributionStatuses = await this.rootStore.application.lookup.contributionStatusStore.find();
                    return this.contributionStatuses;
                },
                onChange: (contributionStatus) => {
                    this.queryUtility.filter.contributionStatusIds = contributionStatus.map(status => { return status.id });
                }
            });
    }

    createPaymentTypeDropodownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.paymentTypeStore.find();
                },
                onChange: (paymentType) => {
                    this.queryUtility.filter.paymentTypeIds = paymentType.map(type => { return type.id });
                }
            });
    }

    @action.bound
    async submitPending(){
        let pendingDeposits = this.tableStore.selectedItems.filter(s => s.contributionStatus.abrv === 'pending' && s.paymentType.abrv === 'ach');
        var response = await this.rootStore.application.administration.contributionStore.generateCsvContributionFile({ids: pendingDeposits.map(item => {return item.id}), achBatchNumber: this.form.values().paymentNumber, contentType: 'text/csv' });
       
        const nowDate = new Date();
        const fileName = `${"Contribution".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.csv`;
        saveAs(response, fileName);
        this.rootStore.notificationStore.success("Contribution report generated.");
    }

    @action.bound
    async onAchNextPaymentNumberClick() {
        this.achBatchCurrentNumber = await this.rootStore.application.administration.contributionStore.achBatchCurrentNumber({ increment: true });
        this.form.$('paymentNumber').set(this.achBatchCurrentNumber.toString());
    }
}

export default ContributionViewStore;
