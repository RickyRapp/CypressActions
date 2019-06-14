import { FundTransferService } from "common/data";
import { FundTransferListFilter } from 'modules/main/fund-transfer/models';
import { BaseFundTransferListViewStore } from 'modules/common/fund-transfer/stores';
import _ from 'lodash';

class FundTransferListViewStore extends BaseFundTransferListViewStore {
    constructor(rootStore) {
        const fundTransferService = new FundTransferService(rootStore.app.baasic.apiClient);
        let filter = new FundTransferListFilter();
        const userId = rootStore.authStore.user.id;
        filter.donorAccountId = userId;

        const listViewStore = {
            name: 'fund transfer',
            routes: {
            },
            actions: {
                find: async params => {
                    params.embed = 'senderDonorAccount,recipientDonorAccount,coreUser,createdByCoreUser';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await fundTransferService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        };


        const setColumns = [
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency',
            },
            {
                key: 'senderDonorAccount.coreUser',
                title: 'SENDER',
                type: 'function',
                function: (item) => { return `${item.senderDonorAccount.coreUser.firstName} ${item.senderDonorAccount.coreUser.lastName}` }
            },
            {
                key: 'recipientDonorAccount.coreUser',
                title: 'RECIPIENT',
                type: 'function',
                function: (item) => { return `${item.recipientDonorAccount.coreUser.firstName} ${item.recipientDonorAccount.coreUser.lastName}` }
            },
            {
                key: 'description',
                title: 'DESCRIPTION'
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'object',
                type: 'function',
                function: (item) => { return `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` }
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
        ];

        const config = {
            listViewStore: listViewStore,
            userId: userId,
            setColumns: setColumns
        };

        super(rootStore, config);
    }
}

export default FundTransferListViewStore;