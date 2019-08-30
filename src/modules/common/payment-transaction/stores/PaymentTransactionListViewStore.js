import React from 'react';
import { observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

class PaymentTransactionListViewStore extends BaseViewStore {
    @observable paymentTransactions = [];

    constructor(rootStore, { items, highlightId }) {
        super(rootStore)

        let tempItems = [];

        _.forEach(items, function (item) {
            if (item.paymentTransaction) {
                tempItems.push(item.paymentTransaction);
            }
            if (item.fee) {
                tempItems.push(item.fee.paymentTransaction);
            }
            if (item.donorAccountFee && item.donorAccountFee.fee) {
                tempItems.push(item.donorAccountFee.fee.paymentTransaction);
            }
        });

        this.highlightId = highlightId;
        this.paymentTransactions = _.orderBy(tempItems, 'dateCreated', 'desc');
    }
}

export default PaymentTransactionListViewStore;