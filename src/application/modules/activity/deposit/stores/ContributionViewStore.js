import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { ContributionService } from 'application/contribution/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { ContributionListFilter } from 'application/activity/deposit/models';
import moment from 'moment';

@applicationContext
class ContributionViewStore extends BaseListViewStore {
    @observable accountTypes = null;
    contributionStatuses = [];

    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution',
            authorization: 'theDonorsFundContributionSection',
            autoInit: true,
            routes: {
                edit: (editId, donorId) => {
                    let queryParams = null;
                    if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                        queryParams = { donorId: donorId }
                    }
                    this.rootStore.routerStore.goTo('master.app.main.contribution.edit', { editId: editId }, queryParams);
                },
                create: () => {
                    if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create'))
                        this.openSelectDonorModal();
                    else
                        this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donorId });
                },
                preview: (id, donorId) => {
                    let queryParams = null;
                    if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                        queryParams = { donorId: donorId }
                    }
                    this.rootStore.routerStore.goTo('master.app.main.contribution.details', { id: id }, queryParams);
                },
            },
            queryConfig: {
                filter: new ContributionListFilter('dateCreated', 'desc'),
                disableUpdateQueryParams: false,
                onResetFilter: () => {
                    this.paymentTypeDropdownStore.setValue(null);
                    this.contributionStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                const service = new ContributionService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donor',
                            'payerInformation',
                            'bankAccount',
                            'paymentType',
                            'contributionStatus'
                        ];

                        const response = await service.find({ userId: this.donorId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.user.id;
        this.createTableStore();
        this.createPaymentTypeDropdownStore();
        this.createContributionStatusDropdownStore();

        this.selectDonorModal = new ModalParams({});
        this.reviewModal = new ModalParams({});
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
    }

    // @action.bound
    // async onInit({ initialLoad }) {
    //     if (!initialLoad) {
    //         this.rootStore.routerStore.goBack();
    //     }
    //     else {
    //         this.loaderStore.resume();
    //     }
    // }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: donorId })
            }
        );
    }

    @action.bound
    onClickDonorFromFilter(donorId) {
        this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: donorId })
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
                if (item.bankAccount.accountNumber.length > 4) {
                    return `${item.paymentType.name}${' ...' + item.bankAccount.accountNumber.substr(item.bankAccount.accountNumber.length - 4)}`;
                }
                else {
                    return `${item.paymentType.name}${' ...' + item.bankAccount.accountNumber}`;
                }
            }
        }
        return item.paymentType.name;
    }

    @action.bound
    async openCancelContribution(item) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to cancel contribution (#${item.confirmationNumber}) created 
            on: ${moment(item.dateCreated).format('dddd, MMMM Do YYYY, h:mm:ss a')} with amount: $${item.amount.toFixed(2)}`,
            async () => {
                this.loaderStore.suspend();
                try {
                    const service = new ContributionService(this.rootStore.application.baasic.apiClient);
                    await service.review({ id: item.id, contributionStatusId: this.contributionStatuses.find(c => c.abrv === 'canceled').id });
                    this.queryUtility.fetch();
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
                    const service = new ContributionService(this.rootStore.application.baasic.apiClient);
                    await service.review({ id: item.id, contributionStatusId: newStatusId });
                    this.queryUtility.fetch();
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
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true,
                    visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')
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
                    if (item.contributionStatus.abrv === 'pending' || item.contributionStatus.abrv === 'in-process') {
                        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                        else {
                            if (item.contributionStatus.abrv === 'pending') {
                                const dateToEdit = moment(item.dateCreated).add(15, 'm');
                                return moment().isBetween(moment(item.dateCreated), dateToEdit);
                            }
                        }
                    }
                    return false;
                },
                onCancelRender: (item) => {
                    if (item.contributionStatus.abrv === 'pending' || item.contributionStatus.abrv === 'in-process') {
                        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                        else {
                            if (item.contributionStatus.abrv === 'pending') {
                                const dateToEdit = moment(item.dateCreated).add(30, 'm');
                                return moment().isBetween(moment(item.dateCreated), dateToEdit);
                            }
                        }
                    }
                    return false;
                },
                onReviewRender: (item) => {
                    return ['pending', 'in-process', 'funded'].includes(item.contributionStatus.abrv);
                }
            }
        }));
    }

    createPaymentTypeDropdownStore() {

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
    createContributionStatusDropdownStore() {
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
}

export default ContributionViewStore;
