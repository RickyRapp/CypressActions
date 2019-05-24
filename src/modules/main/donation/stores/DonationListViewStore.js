import { action } from 'mobx';
import { CharityService } from "common/data";
import { BaseListViewStore, TableViewStore } from "core/stores";
import { DonationListFilter } from 'modules/main/donation/models';
import _ from 'lodash';

class DonationListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);

        let filter = new DonationListFilter()
        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        super(rootStore, {
            name: 'donation',
            routes: {
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await charityService.donation(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.load();
    }

    @action.bound async load() {
        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'charityName',
                        title: 'Name'
                    },
                    {
                        key: 'donorName',
                        title: 'Donor'
                    },
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: 'currency'
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                    {
                        key: 'type',
                        title: 'Details',
                        type: 'function',
                        function: this.renderLink
                    },
                ],
                actions: {
                },
            })
        );
    }

    @action.bound renderLink(item) {
        if (item.grantId) {
            return 'Grant'
        }
        return null;
    }

}

export default DonationListViewStore;