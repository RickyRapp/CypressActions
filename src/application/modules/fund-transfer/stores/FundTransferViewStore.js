import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { FundTransferService } from 'application/fund-transfer/services';
import { DonorAccountService } from 'application/donor-account/services';
import { applicationContext, donorAccountFormatter } from 'core/utils';
import { FundTransferListFilter } from 'application/fund-transfer/models';
import _ from 'lodash';

@applicationContext
class FundTransferViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id
        let filter = new FundTransferListFilter('dateCreated', 'desc')
        filter.donorAccountId = id;

        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundContributionSection',
            routes: {
                create: () => {
                    this.rootStore.routerStore.goTo('master.app.main.fund-transfer.create');
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
                const service = new FundTransferService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'senderDonorAccount',
                            'senderDonorAccount.coreUser',
                            'senderDonorAccount.companyProfile',
                            'recipientDonorAccount',
                            'recipientDonorAccount.coreUser',
                            'recipientDonorAccount.companyProfile',
                            'createdByCoreUser'
                        ];

                        params.fields = [
                            'senderDonorAccount',
                            'senderDonorAccount.donorName',
                            'recipientDonorAccount',
                            'recipientDonorAccount.donorName',
                            'amount',
                            'description',
                            'createdByCoreUser',
                            'dateCreated'
                        ]

                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'amount',
                    title: 'FUND_TRANSFER.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'senderDonorAccount.donorName',
                    title: 'FUND_TRANSFER.LIST.COLUMNS.SENDER_DONOR_NAME_LABEL'
                },
                {
                    key: 'recipientDonorAccount.donorName',
                    title: 'FUND_TRANSFER.LIST.COLUMNS.RECIPIENT_DONOR_NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'FUND_TRANSFER.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'createdByCoreUser.firstName',
                    title: 'FUND_TRANSFER.LIST.COLUMNS.CREATED_BY_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'FUND_TRANSFER.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'FUND_TRANSFER.LIST.SELECT_DONOR',
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
                            'donorName',
                            'securityPin',
                            'donorAccountAddresses'
                        ]
                    });
                    return _.map(response.item, x => {
                        return {
                            id: x.id,
                            name: donorAccountFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: (donorAccountId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorAccountId })
                }
            });
    }
}

export default FundTransferViewStore;
