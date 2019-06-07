import React from 'react';
import { action, observable } from 'mobx';
import { ActivityAndHistoryService, LookupService, DonorAccountService } from "common/data";
import { ActivityAndHistoryListFilter } from 'modules/common/activity-and-history/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { getDonorNameDropdown } from 'core/utils';
import { ModalParams } from 'core/models';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip'
import _ from 'lodash';

class ActivityAndHistoryListViewStore extends BaseListViewStore {
    @observable paymentTransactionTypes = null;
    @observable paymentTransactionStatuses = null;
    @observable loaded = false;
    @observable donorAccountSearchDropdownStore = null;
    @observable paymentTransactionStatusDropdownStore = null;
    @observable paymentTransaction = null;

    constructor(rootStore) {
        const activityAndHistoryService = new ActivityAndHistoryService(rootStore.app.baasic.apiClient);
        let filter = new ActivityAndHistoryListFilter();
        if (rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.read')) {
            filter.donorAccountId = rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.donorAccountId : null;
        }
        else {
            filter.donorAccountId = rootStore.authStore.user.id;
        }

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

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: () => { this.paymentTransaction = null; this.onClose }
        });

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
                        type: 'function',
                        function: this.renderStatus
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
                        function: this.renderText
                    },
                ],
                actions: {
                    onDetails: paymentTransaction => { this.paymentTransaction = paymentTransaction; this.detailsModalParams.open(); }
                },
                actionsRender: {
                    renderDetails: (paymentTransaction) => paymentTransaction.contributionId || paymentTransaction.grantId
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

    @action.bound renderStatus(item) {
        const itemValue = _.find(this.paymentTransactionStatuses, { id: item.paymentTransactionStatusId }).name;

        let description = null;
        if (item.description && item.description !== '') {
            description = item.description;
        }
        return (
            <React.Fragment>
                {itemValue}
                {description &&
                    <React.Fragment>
                        <span className='icomoon tiny icon-cog' data-tip data-for={`description_${item.id}`} />
                        <ReactTooltip type='info' effect='solid' place="right" id={`description_${item.id}`}>
                            <p>{description}</p>
                        </ReactTooltip>
                    </React.Fragment>}
            </React.Fragment>);
    }

    @action.bound renderText(item) {
        if (item.contributionId) {
            return 'Contribution';
        }
        else if (item.fundTransferId) {
            return 'Fund Transfer';
        }
        else if (item.grantId) {
            return 'Grant';
        }
        else if (item.feeId) {
            return 'Fee';
        }
        return null;
    }

    @action.bound async loadLookups() {
        const paymentTransactionTypeModel = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = paymentTransactionTypeModel.data;

        const paymentTransactionStatusModel = await this.paymentTransactionStatusLookup.getAll();
        this.paymentTransactionStatuses = paymentTransactionStatusModel.data;
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