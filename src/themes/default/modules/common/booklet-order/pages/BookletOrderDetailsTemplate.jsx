import React from 'react';
import { defaultTemplate, formatDenomination } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';
import { Loader } from 'core/components';
import { PaymentTransactionList } from 'modules/common/payment-transaction/pages';
import NumberFormat from 'react-number-format';

function BookletOrderDetailsTemplate({ bookletOrderDetailsViewStore }) {
    const {
        loaderStore,
        bookletOrder,
        paymentTransactionStatuses,
        paymentTransactionTypes,
        highlightId,
        deliveryMethodTypes,
        denominationTypes,
        accountTypes
    } = bookletOrderDetailsViewStore;

    return (
        <React.Fragment>
            {loaderStore.loading &&
                <Loader />}

            {bookletOrder &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Amount</strong>
                            <NumberFormat value={bookletOrder.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Confirmation Number</strong>
                            {bookletOrder.confirmationNumber}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Delivery Method</strong>
                            {_.find(deliveryMethodTypes, { id: bookletOrder.deliveryMethodTypeId }).name}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Tracking Number</strong>
                            {bookletOrder.trackingNumber}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Account Type</strong>
                            {_.find(accountTypes, { id: bookletOrder.accountTypeId }).name}
                        </div>

                        {_.find(accountTypes, { abrv: 'basic' }).id === bookletOrder.accountTypeId &&
                            <React.Fragment>
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Deduction</strong>
                                    {bookletOrder.deduction}
                                </div>

                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Fee Charge</strong>
                                    {bookletOrder.feeCharge}
                                </div>
                            </React.Fragment>}

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Created</strong>
                            {moment(bookletOrder.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Updated</strong>
                            {moment(bookletOrder.dateUpdated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>

                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <strong>Booklet Order Items</strong>
                        </div>
                    </div>

                    <table className="table w--100">
                        <thead className="table__head">
                            <tr>
                                <th className="table__head--data">Denomination</th>
                                <th className="table__head--data">Count</th>
                                <th className="table__head--data">Total</th>
                                <th className="table__head--data">Booklet(s)</th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {_.sortBy(bookletOrder.bookletOrderItems, ['denominationType.sortOrder']).map(item => {
                                const denominationType = _.find(denominationTypes, { id: item.denominationTypeId });

                                return (<tr key={item.id}>
                                    <td className="table__body--data">{formatDenomination(denominationType, false)}</td>
                                    <td className="table__body--data">{item.count}</td>
                                    <td className="table__body--data"><NumberFormat value={denominationType.certificateAmount * denominationType.value * item.count} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    <td className="table__body--data">{item.bookletOrderItemBooklets && item.bookletOrderItemBooklets.length > 0 ?
                                        _.join(_.map(item.bookletOrderItemBooklets, item => { return item.booklet.code }), ', ')
                                        :
                                        'N/A'}
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>

                    {bookletOrder.bookletOrderTransactions && bookletOrder.bookletOrderTransactions.length > 0 &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-12">
                                    <strong>Payment Transactions</strong>
                                </div>
                            </div>

                            <PaymentTransactionList
                                items={bookletOrder.bookletOrderTransactions}
                            />
                        </React.Fragment>}
                </React.Fragment>}
        </React.Fragment>
    );
};

export default defaultTemplate(BookletOrderDetailsTemplate);
