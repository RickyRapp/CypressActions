import React from 'react';
import { defaultTemplate } from 'core/utils';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'

function PaymentTransactionListTemplate({ paymentTransactionListViewStore, t }) {
    const {
        paymentTransactions,
        highlightId
    } = paymentTransactionListViewStore;

    const renderAmount = (item) => {
        let amount = null;
        if (item.paymentTransactionType.abrv === 'credit') {
            amount = item.amount;
        }
        else if (item.paymentTransactionType.abrv === 'debit') {
            amount = `-${item.amount}`
        }
        return <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
    }

    return (
        <table className="table w--100">
            <thead className="table__head">
                <tr>
                    <th className="table__head--data">Date Created</th>
                    <th className="table__head--data">Amount</th>
                    <th className="table__head--data">Available balance</th>
                    <th className="table__head--data">Present balance</th>
                    <th className="table__head--data">Status</th>
                    <th className="table__head--data">Done</th>
                </tr>
            </thead>
            <tbody className="table__body">
                {paymentTransactions.map(item => {
                    return (<tr key={item.id} style={item.id === highlightId ? { backgroundColor: 'khaki' } : null}>
                        <td className="table__body--data">{moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}</td>
                        <td className="table__body--data">{renderAmount(item)}</td>
                        <td className="table__body--data">{renderAmount(item)}</td>
                        <td className="table__body--data">{renderAmount(item)}</td>
                        <td className="table__body--data">
                            {item.paymentTransactionStatus.name}
                            {item.description &&
                                <React.Fragment>
                                    <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.id}`} />
                                    <ReactTooltip type='info' effect='solid' id={`description_${item.id}`}>
                                        <p>{item.description}</p>
                                    </ReactTooltip>
                                </React.Fragment>}
                        </td>
                        <td className="table__body--data">{item.done ? 'Yes' : 'No'}</td>
                    </tr>)
                })}
            </tbody>
        </table>
    );
}

export default defaultTemplate(PaymentTransactionListTemplate);
