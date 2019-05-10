import React from 'react';
import { action, observable } from 'mobx';
import { ActivityAndHistoryService, LookupService } from "common/data";
import { ActivityAndHistoryListFilter } from 'modules/main/activity-and-history/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import NumberFormat from 'react-number-format';
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
        //filter.donorAccountId is handled on server side

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
                filter: filter,
                disableUpdateQueryParams: true
            }
        });

        this.rootStore = rootStore;
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');
        this.paymentTransactionStatusReasonLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status-reason');

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setStores();
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
        let amount = null;
        if (item.paymentTransactionTypeId === creditId) {
            amount = `${item.amount}`;
        }
        else if (item.paymentTransactionTypeId === debitId) {
            amount = `-${item.amount}`
        }
        return <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />;
    }

    @action.bound renderLink(item) {
        if (item.contributionId) {
            return <a onClick={() => this.rootStore.routerStore.navigate('master.app.main.contribution.details', { id: item.contributionId })}>Contribution</a>
        }
        else if (item.fundTransferId) {
            return <a onClick={() => this.rootStore.routerStore.navigate('master.app.main.fund-transfer.list')}>Fund Transfer</a>
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
}

export default ActivityAndHistoryListViewStore;