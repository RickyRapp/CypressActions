import { action } from 'mobx';
import { CharityService } from "common/data";
import { BaseListViewStore, TableViewStore } from "core/stores";
import { DonationListFilter } from 'modules/main/donation/models';
import _ from 'lodash';

class DonationListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);

        let filter = new DonationListFilter()
        filter.charityId = rootStore.authStore.user.id;

        super(rootStore, {
            name: 'donation',
            actions: {
                find: async params => {
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await charityService.donation(params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        });

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
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
                        key: 'done',
                        title: 'Done',
                        type: 'function',
                        function: (item) => item.done ? 'Yes' : 'No'
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
                        function: (item) => item.grantId ? 'Grant' : ''
                    },
                ],
            })
        );
    }
}

export default DonationListViewStore;