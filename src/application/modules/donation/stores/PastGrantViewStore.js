import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { CharityService } from 'application/charity/services';
import { DonationListFilter } from 'application/donation/models';
import _ from 'lodash'
import { charityFormatter } from 'core/utils';
import { LookupService } from 'common/services';

class PastGrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const filter = new DonationListFilter();
        if (rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
            if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId) {
                filter.donorId = rootStore.routerStore.routerState.queryParams.donorId;
            }
        }

        super(rootStore, {
            name: 'past-grant',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.charityDropdownStore.setValue(null);
                    this.donationStatusDropdownStore.setValue(null);
                    this.donationTypeDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new DonationService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'donationType',
                            'donationStatus'
                        ];

                        let userId = null;
                        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                            userId = rootStore.userStore.user.id
                        }

                        const response = await service.findPastGrant({ userId: userId, ...params });
                        return response.data;
                    }
                }
            }
        });

        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
            this.donorId = rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id;
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'DONATION.PAST_GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'DONATION.PAST_GRANT.LIST.COLUMNS.CHARITY_LABEL'
                },
                {
                    key: 'donationType.name',
                    title: 'DONATION.PAST_GRANT.LIST.COLUMNS.DONATION_TYPE_LABEL',
                },
                {
                    key: 'amount',
                    title: 'DONATION.PAST_GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'donationStatus.name',
                    title: 'DONATION.PAST_GRANT.LIST.COLUMNS.DONATION_STATUS_LABEL',
                }
            ],
            actions: {
                // onPreview: (item) => this.routes.processed(item.charity.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
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
                            'charityAddresses'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
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

        this.donationStatusDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_STATUS_PLACEHOLDER',
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'donation-status');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter.donationStatusIds = _.map(donationStatus, (status) => { return status.id });
                }
            });

        this.donationTypeDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_TYPE_PLACEHOLDER',
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'donation-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (donationType) => {
                    this.queryUtility.filter.donationTypeIds = _.map(donationType, (type) => { return type.id });
                }
            });
    }
}

export default PastGrantViewStore;
