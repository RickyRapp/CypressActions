import React from 'react';
import { action, observable } from 'mobx';
import { ActivityAndHistoryService, LookupService, DonorAccountService } from "common/data";
import { ActivityAndHistoryListFilter } from 'modules/administration/activity-and-history/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

class ActivityAndHistoryListViewStore extends BaseListViewStore {
    @observable paymentTransactionTypes = null;
    @observable paymentTransactionStatuses = null;
    @observable paymentTransactionStatusReasons = null;
    @observable loaded = false;
    @observable donorAccountSearchDropdownStore = null;
    @observable paymentTransactionStatusDropdownStore = null;

    constructor(rootStore) {
        const activityAndHistoryService = new ActivityAndHistoryService(rootStore.app.baasic.apiClient);
        let filter = new ActivityAndHistoryListFilter();
        filter.donorAccountId = rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.donorAccountId : null;

        super(rootStore, {
            name: 'activity and history',
            actions: {
                find: async params => {
                    params.embed = 'donorAccount,coreUser';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await activityAndHistoryService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            },
            autoInit: false
        });

        this.rootStore = rootStore;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');
        this.paymentTransactionStatusReasonLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status-reason');

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.loadData()
        await this.setStores();
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
                        key: 'paymentTransactionStatusId',
                        title: 'Status',
                        type: 'lookup',
                        lookup: this.paymentTransactionStatuses
                    },
                    {
                        key: 'paymentTransactionStatusReasonId',
                        title: 'Reason',
                        type: 'lookup',
                        defaultValue: '-',
                        lookup: this.paymentTransactionStatusReasons
                    },
                    {
                        key: 'done',
                        title: 'Done',
                        type: 'bool',
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
            return <a onClick={() => this.rootStore.routerStore.navigate('master.app.administration.contribution.details', { userId: item.donorAccountId, contributionId: item.contributionId })}>Contribution</a>
        }
        else if (item.fundTransferId) {
            return <a onClick={() => this.rootStore.routerStore.navigate('master.app.administration.fund-transfer.list')}>Fund Transfer</a>
        }
        return null;
    }

    @action.bound async loadLookups() {
        const paymentTransactionTypeModel = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = paymentTransactionTypeModel.data;

        const paymentTransactionStatusModel = await this.paymentTransactionStatusLookup.getAll();
        this.paymentTransactionStatuses = paymentTransactionStatusModel.data;

        const paymentTransactionStatusReasonModel = await this.paymentTransactionStatusReasonLookup.getAll();
        this.paymentTransactionStatusReasons = paymentTransactionStatusReasonModel.data;
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
            this.queryUtility._reloadCollection();
        }

        this.paymentTransactionStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Payment Transaction Status',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (option) => this.queryUtility.filter.paymentTransactionStatusId = (option ? option.id : null)
            },
            _.map(_.orderBy(this.paymentTransactionStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );
    }

    @action.bound async onDonorFilterSearch(option) {
        this.queryUtility.filter.donorAccountId = option ? option.id : null;
        this.queryUtility._reloadCollection();
    }
}

export default ActivityAndHistoryListViewStore;