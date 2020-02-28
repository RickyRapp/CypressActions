import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { CharityService } from 'application/charity/services';
import { GroupedDonationListFilter } from 'application/donation/models';
import _ from 'lodash'
import { charityFormatter } from 'core/utils';

class GroupedDonationViewStore extends BaseListViewStore {
    constructor(rootStore) {
        let filter = new GroupedDonationListFilter();

        super(rootStore, {
            name: 'donation',
            authorization: 'theDonorsFundDonationSection',
            routes: {
                review: (charityId) => {
                    return this.rootStore.routerStore.goTo(
                        'master.app.main.donation.review',
                        { id: charityId }
                    )
                }
            },
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.searchCharityDropdownStore.setValue(null);
                    this.donationStatusDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new DonationService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity'
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
                    key: 'charity.name',
                    title: 'DONATION.LIST.COLUMNS.CHARITY_NAME_LABEL'
                },
                {
                    key: 'count',
                    title: 'DONATION.LIST.COLUMNS.COUNT_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            const grantCount = item.grantCount;
                            const combinedGrantCount = item.combinedGrantCount;
                            const sessionCount = item.sessionCount;
                            return `Grants: ${grantCount} | Combined grants: ${combinedGrantCount} | Sessions: ${sessionCount}`;
                        }
                    }
                },
                {
                    key: 'totalAmount',
                    title: 'DONATION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onReview: (item) => this.routes.review(item.charity.id),
                onPreviewProcessed: (item) => this.routes.processed(item.charity.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.searchCharityDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAccountType'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAccountType',
                            'charityAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter['charityId'] = charityId;
                }
            });
    }
}

export default GroupedDonationViewStore;
