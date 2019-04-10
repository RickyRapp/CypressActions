import React from 'react';
import { action, observable } from 'mobx';
import { ActivityAndHistoryService, LookupService, DonorAccountService } from "common/data";
import { ActivityAndHistoryListFilter } from 'modules/activity-and-history/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

class ActivityAndHistoryListViewStore extends BaseListViewStore {
    @observable paymentTransactionTypes = null;
    @observable loaded = false;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const activityAndHistoryService = new ActivityAndHistoryService(rootStore.app.baasic.apiClient);
        let filter = new ActivityAndHistoryListFilter();

        if (rootStore.authStore.hasPermission('theDonorsFundSection.read')) {
            if (rootStore.routerStore.routerState.params.donorAccountId)
                filter.donorAccountId = rootStore.routerStore.routerState.params.donorAccountId;
        }
        else if (rootStore.authStore.hasPermission('theDonorsFundDonorSection.read')) {
            filter.donorAccountId = rootStore.authStore.user.id;
        }
        else {
            //TODO:
            //reporter role, fetch user id form local storage
        }

        super(rootStore, {
            name: 'activity and history',
            actions: {
                find: async params => {
                    if (!filter.donorAccountId) {
                        return [];
                    }
                    params.embed = 'donorAccount,coreUser';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await activityAndHistoryService.find(filter.donorAccountId, params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.rootStore = rootStore;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');

        this.permissions = {
            employeeRead: rootStore.authStore.hasPermission('theDonorsFundSection.read'),
        }

        this.load();
    }

    @action.bound async load() {
        if (this.permissions.employeeRead)
            await this.setStores();

        await this.loadLookups();
        await this.loadData()
        this.loaded = true;
    }

    @action.bound async loadData() {
        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: 'function',
                        function: this.renderAmount
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                    {
                        key: 'details',
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

    @action.bound renderAmount(item) {
        const creditId = _.find(this.paymentTransactionTypes, { abrv: 'credit' }).id;
        const debitId = _.find(this.paymentTransactionTypes, { abrv: 'debit' }).id;

        if (item.paymentTransactionTypeId === creditId) {
            return `$${item.amount}`;
        }
        else if (item.paymentTransactionTypeId === debitId) {
            return `-$${item.amount}`
        }
        return null;
    }

    @action.bound renderLink(item) {
        if (item.contributionId) {
            return <a onClick={() => this.rootStore.routerStore.navigate('master.app.main.contribution.details', { id: item.donorAccountId, contributionId: item.contributionId })}>Contribution</a>
        }
        else if (item.fundTransferId) {
            if (this.permissions.employeeRead) {
                return <a onClick={() => this.rootStore.routerStore.navigate('master.app.main.fund.transfer.list', { donorAccountId: item.donorAccountId })}>Fund Transfer</a>
            }
            else {
                return <a onClick={() => this.rootStore.routerStore.navigate('master.app.main.fund.transfer.list', { id: item.donorAccountId })}>Fund Transfer</a>
            }
        }
        return null;
    }

    @action.bound async loadLookups() {
        const model = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = model.data;
    }

    @action.bound async setStores() {
        this.donorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onDonorFilterSearch
            }
        );

        if (this.queryUtility.filter.donorAccountId) {
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address'];
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }

    @action.bound async onDonorFilterSearch(option) {
        this.queryUtility.filter.donorAccountId = option ? option.id : null;
        this.queryUtility._reloadCollection();
    }
}

export default ActivityAndHistoryListViewStore;