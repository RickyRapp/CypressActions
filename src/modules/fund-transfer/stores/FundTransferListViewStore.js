import { action, observable } from 'mobx';
import { FundTransferService, DonorAccountService } from "common/data";
import { BaseListViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { getDonorNameDropdown } from 'core/utils';
import { FundTransferListFilter } from 'modules/fund-transfer/models';
import _ from 'lodash';

class FundTransferListViewStore extends BaseListViewStore {
    @observable recepientDonorAccountSearchDropdownStore = null;
    @observable senderDonorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const fundTransferService = new FundTransferService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'fund transfer',
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.main.fund.transfer.create')
                }
            },
            actions: {
                find: async params => {
                    params.embed = 'senderDonorAccount,recepientDonorAccount,coreUser,createdByCoreUser';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await fundTransferService.find(rootStore.routerStore.routerState.params.id, params);
                    return response;
                }
            },
            queryConfig: {
                filter: new FundTransferListFilter()
            }
        });

        this.permissions = {
            employeeRead: rootStore.authStore.hasPermission('theDonorsFundSection.read'),
            create: rootStore.authStore.hasPermission('theDonorsFundSection.create')
        }

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.senderDonorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Sender',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onChangeSenderDonorAccountSearch
            }
        );

        this.recepientDonorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Recepient',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onChangeRecepientDonorAccountSearch
            }
        );

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: 'currency',
                        format: 'US'
                    },
                    {
                        key: 'senderDonorAccount.coreUser',
                        title: 'Sender',
                        permissions: { read: this.contributionEmployeeRead },
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'recepientDonorAccount.coreUser',
                        title: 'Recepient',
                        permissions: { read: this.contributionEmployeeRead },
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'description',
                        title: 'Description'
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
                        key: 'dateUpdated',
                        title: 'Date Updated',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ]
            })
        );
    }

    @action.bound async onChangeSenderDonorAccountSearch(option) {
        this.queryUtility.filter.senderDonorAccountId = (option ? option.id : null)
    }

    @action.bound async onChangeRecepientDonorAccountSearch(option) {
        this.queryUtility.filter.recepientDonorAccountId = (option ? option.id : null)
    }
}

export default FundTransferListViewStore;