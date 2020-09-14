import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { FundTransferService } from 'application/fund-transfer/services';
import { DonorService } from 'application/donor/services';
import { applicationContext, donorFormatter } from 'core/utils';
import { FundTransferListFilter } from 'application/fund-transfer/models';
import _ from 'lodash';

@applicationContext
class FundTransferViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.user.id
        let filter = new FundTransferListFilter('dateCreated', 'desc')
        filter.donorId = id;

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
                    filter.donorId = id;
                }
            },
            actions: () => {
                const service = new FundTransferService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'senderDonor',
                            'senderDonor.coreUser',
                            'senderDonor.companyProfile',
                            'recipientDonor',
                            'recipientDonor.coreUser',
                            'recipientDonor.companyProfile',
                            'createdByCoreUser'
                        ];

                        params.fields = [
                            'senderDonor',
                            'senderDonor.donorName',
                            'recipientDonor',
                            'recipientDonor.donorName',
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
                    key: 'senderDonor.donorName',
                    title: 'FUND_TRANSFER.LIST.COLUMNS.SENDER_DONOR_NAME_LABEL'
                },
                {
                    key: 'recipientDonor.donorName',
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

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'FUND_TRANSFER.LIST.SELECT_DONOR',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: (donorId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorId })
                }
            });
    }
}

export default FundTransferViewStore;
