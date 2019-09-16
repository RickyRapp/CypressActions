import React from 'react';
import { action, observable } from 'mobx';
import { LookupService, DonorAccountService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip'
import _ from 'lodash';

class BaseActivityAndHistoryListViewStore extends BaseListViewStore {
    @observable paymentTransactionTypes = null;
    @observable paymentTransactionStatuses = null;
    @observable paymentTransactionStatusDropdownStore = null;
    @observable pendingTransactions = null;

    columns = null;
    setActions = null;
    setRenderActions = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore);

        this.rootStore = rootStore;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: () => { this.paymentTransaction = null; this.onClose }
        });

        this.defaultActions = {
            onDetails: paymentTransaction => { this.paymentTransaction = paymentTransaction; this.detailsModalParams.open(); }
        };
        this.defaultRenderActions = {
            renderDetails: (paymentTransaction) => paymentTransaction.contributionId || paymentTransaction.grantId || paymentTransaction.feeId || paymentTransaction.bookletOrderId
        };
    }

    @action.bound async loadData(callback = null) {
        await this.loadLookups();
        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: this.columns,
                actions: _.merge(this.defaultActions, this.setActions),
                actionsRender: _.merge(this.defaultRenderActions, this.setRenderActions)
            })
        );
        if (callback && _.isFunction(callback)) {
            callback();
        }
    }

    @action.bound renderAmount(item) {
        let amount = null;
        if (item.paymentTransactionType.abrv === 'credit') {
            amount = `${item.amount}`;
        }
        else if (item.paymentTransactionType.abrv === 'debit') {
            amount = `-${item.amount}`
        }
        return <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />;
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
                        <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.id}`} />
                        <ReactTooltip type='info' effect='solid' place="right" id={`description_${item.id}`}>
                            <p>{description}</p>
                        </ReactTooltip>
                    </React.Fragment>}
            </React.Fragment>);
    }

    @action renderText(item) {
        if (item.contributionId) {
            return 'Contribution';
        }
        else if (item.fundTransferId) {
            return 'Fund Transfer';
        }
        else if (item.grantId && !item.feeId) {
            return 'Grant';
        }
        else if (item.bookletOrderId && !item.feeId) {
            return 'Booklet Order';
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
}

export default BaseActivityAndHistoryListViewStore;