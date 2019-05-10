import { action, observable } from 'mobx';
import { FundTransferService, DonorAccountService } from "common/data";
import { BaseListViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { getDonorNameDropdown } from 'core/utils';
import { FundTransferListFilter } from 'modules/administration/fund-transfer/models';
import _ from 'lodash';

class FundTransferListViewStore extends BaseListViewStore {
    @observable recipientDonorAccountSearchDropdownStore = null;
    @observable senderDonorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const fundTransferService = new FundTransferService(rootStore.app.baasic.apiClient);

        let filter = new FundTransferListFilter()
        //TODO: add filter for donor account id (both sender and recipient)
        if (rootStore.routerStore.routerState.params.donorAccountId) {
            filter.donorAccountId = rootStore.routerStore.routerState.params.donorAccountId;
        }

        super(rootStore, {
            name: 'fund transfer',
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.administration.fund-transfer.create')
                }
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
        });

        this.permissions = {
            employeeRead: rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.read'),
            employeeCreate: rootStore.authStore.hasPermission('theDonorsFundSection.create')
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

        this.recipientDonorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Recipient',
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
                onChange: this.onChangeRecipientDonorAccountSearch
            }
        );

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: 'currency'
                    },
                    {
                        key: 'senderDonorAccount.coreUser',
                        title: 'Sender',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'recipientDonorAccount.coreUser',
                        title: 'recipient',
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

    @action.bound async onChangeSenderDonorAccountSearch(option) {
        this.queryUtility.filter.senderDonorAccountId = (option ? option.id : null)
    }

    @action.bound async onChangeRecipientDonorAccountSearch(option) {
        this.queryUtility.filter.recipientDonorAccountId = (option ? option.id : null)
    }
}

export default FundTransferListViewStore;