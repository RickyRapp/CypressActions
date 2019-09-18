import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, BaasicModal, ThreeStateToggleFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ActivityAndHistoryFilterBaseTemplate } from 'themes/modules/common/activity-and-history/components';
import { GrantRegularDetails } from 'modules/common/grant/pages';
import { ContributionDetails } from 'modules/common/contribution/pages';
import { BookletOrderDetails } from 'modules/common/booklet-order/pages';
import moment from 'moment';
import _ from 'lodash';


function ActivityAndHistoryListTemplate({ activityAndHistoryListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        detailsModalParams,
        paymentTransaction,
        paymentTransactionTypes,
        pendingTransactions,
        renderAmount
    } = activityAndHistoryListViewStore;

    return (
        <React.Fragment>
            <ListLayout loading={loaderStore.loading}>
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <React.Fragment>
                            <div className="f-row">
                                <div className="f-col f-col-lrg-2">
                                    {paymentTransactionTypes &&
                                        <ThreeStateToggleFilter
                                            queryUtility={queryUtility}
                                            name="paymentTransactionTypeIds"
                                            yesTitle="Credit"
                                            noTitle="Debit"
                                            yesValue={_.find(paymentTransactionTypes, { abrv: 'credit' }).id}
                                            noValue={_.find(paymentTransactionTypes, { abrv: 'debit' }).id}
                                        />}
                                </div>
                                <div className="f-col f-col-lrg-2">
                                    Pending Transactions
                                    <input
                                        type={'checkbox'}
                                        value={queryUtility.filter['pending'] || ''}
                                        checked={queryUtility.filter['pending']}
                                        onChange={e => { queryUtility.filter['pending'] = e.target.checked; }} />
                                </div>
                                <ActivityAndHistoryFilterBaseTemplate queryUtility={queryUtility} />
                            </div>
                        </React.Fragment>
                    </TableFilter>
                </div>
                <div className="f-row spc--bottom--med">
                    <div className="f-col f-col-lrg-6">
                        Transactions
                        {tableStore &&
                            <BaasicTable
                                tableStore={tableStore}
                                loading={loaderStore.loading}
                            />}
                    </div>
                    <div className="f-col f-col-lrg-6">
                        Pending Transactions
                        {pendingTransactions &&
                            <div className="row">
                                <div className="col col-med-12 card card--clear">
                                    <table className="table w--100">
                                        <thead className="table__head">
                                            <tr>
                                                <th className="table__head--data">
                                                    Date
                                    </th>
                                                <th className="table__head--data">
                                                    Description
                                    </th>
                                                <th className="table__head--data">
                                                    Debit/Credit
                                    </th>
                                                <th className="table__head--data">
                                                    Balance
                                    </th>
                                            </tr>

                                        </thead>
                                        <tbody className="table__body">
                                            {pendingTransactions.map(item => {
                                                return (
                                                    <tr>
                                                        <td className="table__body--data">
                                                            {moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}
                                                        </td>
                                                        <td className="table__body--data">
                                                            {item.description}
                                                        </td>
                                                        <td className="table__body--data">
                                                            {renderAmount(item)}
                                                        </td>
                                                        <td className="table__body--data">
                                                            -
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {paymentTransaction &&
                    <BaasicModal modalParams={detailsModalParams} >
                        <div className="col col-sml-12 card card--form card--primary card--lrg">
                            {paymentTransaction.grantId &&
                                <GrantRegularDetails id={paymentTransaction.grantId} highlightId={paymentTransaction.id} />}
                            {paymentTransaction.contributionId &&
                                <ContributionDetails id={paymentTransaction.contributionId} highlightId={paymentTransaction.id} />}
                            {paymentTransaction.bookletOrderId &&
                                <BookletOrderDetails id={paymentTransaction.bookletOrderId} highlightId={paymentTransaction.id} />}
                        </div>
                    </BaasicModal>}
            </ListLayout>
        </React.Fragment>
    );
}

export default defaultTemplate(ActivityAndHistoryListTemplate);
