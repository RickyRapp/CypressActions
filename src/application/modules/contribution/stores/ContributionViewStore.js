import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { ContributionService } from 'application/contribution/services';
import { DonorAccountService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { ContributionListFilter } from 'application/contribution/models';
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class ContributionViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id
        let filter = new ContributionListFilter('dateCreated', 'desc')
        filter.donorAccountId = id;

        super(rootStore, {
            name: 'contribution',
            authorization: 'theDonorsFundContributionSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.contribution.edit',
                        {
                            id: id,
                            editId: editId
                        }
                    );
                },
                create: () => {
                    if (this.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.openSelectDonorModal();
                    }
                    else {
                        this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: id });
                    }
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                }
            },
            actions: () => {
                const service = new ContributionService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile',
                            'payerInformation',
                            'bankAccount',
                            'paymentType',
                            'contributionStatus'
                        ];
                        params.fields = [
                            'id',
                            'donorAccountId',
                            'donorAccount',
                            'donorAccount.donorName',
                            'amount',
                            'dateCreated',
                            'confirmationNumber',
                            'contributionStatus',
                            'paymentType',
                            'payerInformation',
                            'payerInformation.name',
                            'bankAccount',
                            'bankAccount.accountNumber'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorAccount.donorName',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true,
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
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
                onEdit: (contribution) => this.routes.edit(contribution.donorAccountId, contribution.id),
                onReview: (contributionId) => this.openReviewDonorModal(contributionId),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (contribution) => {
                    if (contribution.contributionStatus.abrv === 'pending' || contribution.contributionStatus.abrv === 'in-process') {
                        if (this.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                        else {
                            if (contribution.contributionStatus.abrv === 'pending') {
                                const dateToEdit = moment(contribution.dateCreated).add('minutes', 15);
                                return moment().isBetween(contribution.dateCreated, dateToEdit);
                            }
                        }
                    }
                    return false;
                },
            }
        }));

        this.selectDonorModal = new ModalParams({});
        this.reviewModal = new ModalParams({});

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'CONTRIBUTION.LIST.SELECT_DONOR',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'coreUser',
                            'companyProfile',
                            'donorAccountAddresses',
                            'donorAccountAddresses.address'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.donorName } });
                },
                onChange: (donorAccountId) => {
                    this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: donorAccountId })
                }
            });
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open({ donorAccountId: this.queryUtility.filter.donorAccountId });
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => { this.reviewModal.close(); this.queryUtility.fetch(); }
        });
    }

    @action.bound
    renderPaymentType = (item) => {
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
}

export default ContributionViewStore;
