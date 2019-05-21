import { GrantService } from "common/data";
import { BaseListViewStore, TableViewStore } from 'core/stores';
import { GrantListFilter } from 'modules/administration/grant/models';
import _ from 'lodash';

class GrantListViewStore extends BaseListViewStore {

    constructor(rootStore) {
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        //TODO: add filter for donor account id (both sender and recipient)
        if (rootStore.routerStore.routerState.params.donorAccountId) {
            filter.donorAccountId = rootStore.routerStore.routerState.params.donorAccountId;
        }

        super(rootStore, {
            name: 'grant',
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.administration.grant.create')
                }
            },
            actions: {
                find: async params => {
                    params.embed = 'createdByCoreUser,donorAccount,coreUser';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await grantService.find(params);
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
                        key: 'donorAccount.coreUser',
                        title: 'Donor Accoutn',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: 'currency'
                    },
                    {
                        key: 'createdByCoreUser',
                        title: 'Created By',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                },
            })
        );
    }
}

export default GrantListViewStore;