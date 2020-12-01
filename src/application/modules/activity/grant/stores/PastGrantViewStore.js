import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { DonationListFilter } from 'application/donation/models';
import { charityFormatter } from 'core/utils';
import { observable } from 'mobx';

class PastGrantViewStore extends BaseListViewStore {
    @observable summaryData = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'past-grant',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
            queryConfig: {
                filter: new DonationListFilter(),
                onResetFilter: (filter) => {
                    filter.reset();
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
                        const tableData = await rootStore.application.activity.activityStore.findPastGrants({ donorId: this.donorId, ...params });
                        this.summaryData = await rootStore.application.activity.activityStore.findSummaryPastGrants({ donorId: this.donorId, ...params });
                        return tableData;
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
                    return data.item.map(x => {
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
        this.setTableStore(new SelectTableWithRowDetailsViewStore(this.queryUtility, {
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
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        },
            true));
    }
}

export default PastGrantViewStore;
