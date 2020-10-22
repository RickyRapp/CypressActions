import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { DonationListFilter } from 'application/donation/models';
import { charityFormatter } from 'core/utils';

class PastGrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'past-grant',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
            queryConfig: {
                filter: new DonationListFilter(),
                onResetFilter: () => {
                    this.charityDropdownStore.setValue(null);
                    this.donationStatusDropdownStore.setValue(null);
                    this.donationTypeDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'donationType',
                            'donationStatus',
                            'donor'
                        ];
                        return rootStore.application.activity.activityStore.findPastGrants({ donorId: this.donorId, ...params });
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;

        this.createTableStore();
        this.createCharityDropdownStore();
        this.createDonationStatusDropdownStore();
        this.createDonationTypeDropdownStore();
    }

    createCharityDropdownStore() {
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.activity.activityStore.searchCharity({
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
                    return data.map(x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' })
                        }
                    });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter.charityId = charityId;
                }
            });
    }
    createDonationStatusDropdownStore() {
        this.donationStatusDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_STATUS_PLACEHOLDER',
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.donationStatusStore.find();
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter.donationStatusIds = donationStatus.map((status) => { return status.id });
                }
            });
    }

    createDonationTypeDropdownStore() {
        this.donationTypeDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_TYPE_PLACEHOLDER',
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.donationTypeStore.find();
                },
                onChange: (donationType) => {
                    this.queryUtility.filter.donationTypeIds = donationType.map((type) => { return type.id });
                }
            });
    }

    createTableStore() {
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
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default PastGrantViewStore;
