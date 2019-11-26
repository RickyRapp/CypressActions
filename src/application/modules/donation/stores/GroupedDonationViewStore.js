import { action, runInAction } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { CharityService } from 'application/charity/services';
import { applicationContext } from 'core/utils';
import { LookupService } from 'common/services';
import { GroupedDonationListFilter } from 'application/donation/models';
import _ from 'lodash'

@applicationContext
class GroupedDonationViewStore extends BaseListViewStore {
    donationStatuses = null;

    constructor(rootStore) {
        let filter = new GroupedDonationListFilter();
        filter.donationStatusIds = rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.donationStatusIds : null

        super(rootStore, {
            name: 'donation',
            authorization: 'theDonorsFundDonationSection',
            routes: {
                overview: (charityId) =>
                    rootStore.routerStore.goTo(
                        'master.app.main.donation.overview', null,
                        {
                            charityId: charityId,
                            donationStatusIds: [_.find(this.donationStatuses, { abrv: 'pending' }).id]
                        }),
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
                            'charity',
                            'donationStatus',
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
                    title: 'DONATION.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'totalCount',
                    title: 'DONATION.LIST.COLUMNS.COUNT_LABEL',
                },
                {
                    key: 'totalAmount',
                    title: 'DONATION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'donationStatus.name',
                    title: 'DONATION.LIST.COLUMNS.DONATION_STATUS_NAME_LABEL'
                }
            ],
            actions: {
                onEdit: (item) => this.routes.overview(item.charityId),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    return item.donationStatus.abrv === 'pending'
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

        this.donationStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                onChange: (donationStatus) => {
                    this.queryUtility.filter['donationStatusIds'] = _.map(donationStatus, (status) => { return status.id });
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonationStatus()
            ]);
        }
    }

    @action.bound
    async fetchDonationStatus() {
        this.donationStatusDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'donation-status');
        const response = await service.getAll();
        this.donationStatuses = response.data;
        runInAction(() => {
            this.donationStatusDropdownStore.setItems(response.data);
            if (this.queryUtility.filter['donationStatusIds']) {
                let array = [];
                _.each(this.queryUtility.filter['donationStatusIds'], (item) => {
                    array.push(_.find(this.donationStatuses, { id: item }))
                })
                this.donationStatusDropdownStore.setValue(array);
            }
            this.donationStatusDropdownStore.setLoading(false);
        });
    }
}

export default GroupedDonationViewStore;
