import { action, observable } from 'mobx';
import { LookupService } from "common/data";
import { PaymentTransactionListFilter } from 'modules/common/payment-transaction/models';
import { BaseListViewStore, TableViewStore } from 'core/stores';
import _ from 'lodash';

class PaymentTransactionListViewStore extends BaseListViewStore {
    constructor(rootStore, { items }) {
        let filter = new PaymentTransactionListFilter();
        filter.embed = null;
        filter.orderBy = 'dateCreated';
        filter.orderDirection = 'desc';
        filter.pageSize = 5;
        debugger;
        super(rootStore, {
            name: 'payment-transactions',
            routes: {
            },
            actions: {
                find: async params => {
                    let paymentTransactions = [];

                    _.forEach(items, function (item) {
                        if (item.paymentTransaction) {
                            paymentTransactions.push(item.paymentTransaction);
                        }
                        if (item.fee)
                            paymentTransactions.push(item.fee.paymentTransaction);
                    });

                    paymentTransactions = _.orderBy(paymentTransactions, [filter.orderBy], [filter.orderDirection]);
                    const pageNumber = params.pageNumber - 1;
                    const returnPaymentTransactions = paymentTransactions.slice(pageNumber * params.pageSize, (pageNumber + 1) * params.pageSize);

                    let response = {
                        embed: null,
                        links: [],
                        searchQuery: null,
                        sort: filter.orderBy + '|' + filter.orderDirection,
                        item: returnPaymentTransactions,
                        page: params.pageNumber,
                        recordsPerPage: params.pageSize,
                        totalRecords: paymentTransactions.length
                    };

                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            },
            tableConfig: {
                columns: [
                    {
                        key: 'dateCreated',
                        title: 'DATECREATED',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm',
                        onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
                    },
                    {
                        key: 'amount',
                        title: 'AMOUNT',
                        type: 'currency'
                    },
                    {
                        key: 'currentBalance',
                        title: 'BALANCE',
                        type: 'currency'
                    },
                    {
                        key: 'paymentTransactionStatus.name',
                        title: 'STATUS',
                    },
                    {
                        key: 'paymentTransaction.done',
                        title: 'DONE',
                        type: 'function',
                        function: (item) => item.done ? 'Yes' : 'No'
                    }
                ],
                actions: {
                },
                actionsRender: {
                }
            }
        });
    }
}

export default PaymentTransactionListViewStore;