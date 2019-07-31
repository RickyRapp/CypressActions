import React from 'react';
import _ from 'lodash';
import { PaymentTransactionTableRowTemplate } from "themes/modules/common/payment-transaction/components";
import { defaultTemplate } from 'core/utils';

function PaymentTransactionTableTemplate({
    highlightId,
    paymentTransactionStatuses,
    paymentTransactionTypes,
    models
}) {
    return (
        <table className="table w--100">
            <thead className="table__head">
                <tr>
                    <th className="table__head--data">Date Created</th>
                    <th className="table__head--data">Amount</th>
                    <th className="table__head--data">Balance</th>
                    <th className="table__head--data">Status</th>
                </tr>
            </thead>
            <tbody className="table__body">
                {_.orderBy(models, ['dateCreated'], ['desc']).map(item => {
                    return <PaymentTransactionTableRowTemplate
                        highlightId={highlightId}
                        paymentTransactionStatuses={paymentTransactionStatuses}
                        paymentTransactionTypes={paymentTransactionTypes}
                        item={item}
                    />
                })}
            </tbody>
        </table>
    )
};

export default defaultTemplate(PaymentTransactionTableTemplate);