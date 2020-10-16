import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { FundTransferService } from 'application/fund-transfer/services';
import { applicationContext } from 'core/utils';
import { FundTransferListFilter } from 'application/activity/deposit/models';

@applicationContext
class FundTransferViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundContributionSection',
            routes: {},
            queryConfig: {
                filter: new FundTransferListFilter('dateCreated', 'desc')
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

                        const response = await service.find({ donorId: this.donorId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;
        this.createTableStore();
    }

    createTableStore() {
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
    }
}

export default FundTransferViewStore;
