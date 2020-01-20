import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { CharityService } from 'application/charity/services';
import { GroupedDonationListFilter } from 'application/donation/models';
import _ from 'lodash'

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
                            'groupedDonation'
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
                    key: 'name',
                    title: 'DONATION.LIST.COLUMNS.CHARITY_NAME_LABEL'
                },
                {
                    key: 'groupedDonation',
                    title: 'DONATION.LIST.COLUMNS.COUNT_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            let grantCount = 0;
                            let combinedGrantCount = 0;
                            let sessionCount = 0;
                            if (item.groupedDonation) {
                                grantCount = item.groupedDonation.grantCount;
                                combinedGrantCount = item.groupedDonation.combinedGrantCount;
                                sessionCount = item.groupedDonation.sessionCount;
                            }
                            return `Grants: ${grantCount} | Combined grants: ${combinedGrantCount} | Sessions: ${sessionCount}`;
                        }
                    }
                },
                {
                    key: 'groupedDonation.totalAmount',
                    title: 'DONATION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onEdit: (item) => this.routes.review(item.id),
                onPreviewProcessed: (item) => this.routes.processed(item.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    return item.groupedDonation && (item.groupedDonation.grantCount > 0 || item.groupedDonation.combinedGrantCount > 0 || item.groupedDonation.sessionCount > 0);
                }
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
                            'charityAddresses.address'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter['charityId'] = charityId;
                }
            });
    }
}

export default GroupedDonationViewStore;
