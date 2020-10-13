import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { CharityService } from 'application/charity/services';
import { DonationListFilter } from 'application/donation/models';
import _ from 'lodash'
import { charityFormatter, donorFormatter } from 'core/utils';
import { LookupService } from 'common/services';
import { DonorService } from 'application/donor/services';

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
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new DonationService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'donationType',
                            'donationStatus',
                            'donor'
                        ];

                        let userId = null;
                        if (!this.hasAdministratorPermission) {
                            userId = rootStore.userStore.user.id
                        }

                        const response = await service.findPastGrant({ userId: userId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.hasAdministratorPermission = this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update');
        if (this.hasAdministratorPermission) {
            this.donorId = rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id;
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'ACTIVITY.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: this.hasAdministratorPermission
                },
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

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'CONTRIBUTION.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
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
                            'firstName',
                            'lastName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId) {
                        const id = rootStore.routerStore.routerState.queryParams.donorId;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'firstName',
                                'lastName',
                                'securityPin',
                                'donorAddresses'
                            ]
                        }
                        const response = await donorService.get(id, params);
                        return { id: response.data.id, name: response.data.donorName };
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
}

export default PastGrantViewStore;
