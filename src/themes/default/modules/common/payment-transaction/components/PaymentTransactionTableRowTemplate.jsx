import React from 'react';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'
import { defaultTemplate } from 'core/utils';

function PaymentTransactionTableRowTemplate({
    highlightId,
    paymentTransactionStatuses,
    paymentTransactionTypes,
    item
}) {

    if (item.paymentTransaction && item.fee) {
        return <React.Fragment key={item.paymentTransaction.id}>
            <tr key={item.fee.paymentTransaction.id} style={item.fee.paymentTransaction.id === highlightId ? { backgroundColor: 'khaki' } : null}>
                <td className="table__body--data">{moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}</td>
                <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={_.find(paymentTransactionTypes, { abrv: 'credit' }).id === item.fee.paymentTransaction.paymentTransactionTypeId ? item.fee.paymentTransaction.amount : '-' + item.fee.paymentTransaction.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={item.fee.paymentTransaction.userBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td className="table__body--data">
                    {_.find(paymentTransactionStatuses, { id: item.fee.paymentTransaction.paymentTransactionStatusId }).name}
                    {item.fee.paymentTransaction.description &&
                        <React.Fragment>
                            <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.fee.paymentTransaction.id}`} />
                            <ReactTooltip type='info' effect='solid' place="top" id={`description_${item.fee.paymentTransaction.id}`}>
                                <p>{item.fee.paymentTransaction.description}</p>
                            </ReactTooltip>
                        </React.Fragment>}
                    {item.fee.paymentTransaction.id === highlightId &&
                        <span className="spc--left--lrg">
                            <span className='icomoon tiny icon-question-circle' data-tip data-for={`highlightId_${item.fee.paymentTransaction.id}`} />
                            <ReactTooltip type='info' effect='solid' place="top" id={`highlightId_${item.fee.paymentTransaction.id}`}>
                                <p>Selected Transaction</p>
                            </ReactTooltip>
                        </span>}
                </td>
            </tr>
            <tr key={item.paymentTransaction.id} style={item.paymentTransaction.id === highlightId ? { backgroundColor: 'khaki' } : null}>
                <td className="table__body--data">{moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}</td>
                <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={_.find(paymentTransactionTypes, { abrv: 'credit' }).id === item.paymentTransaction.paymentTransactionTypeId ? item.paymentTransaction.amount : '-' + item.paymentTransaction.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={item.paymentTransaction.userBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td className="table__body--data">
                    {_.find(paymentTransactionStatuses, { id: item.paymentTransaction.paymentTransactionStatusId }).name}
                    {item.paymentTransaction.description &&
                        <React.Fragment>
                            <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.paymentTransaction.id}`} />
                            <ReactTooltip type='info' effect='solid' place="top" id={`description_${item.paymentTransaction.id}`}>
                                <p>{item.paymentTransaction.description}</p>
                            </ReactTooltip>
                        </React.Fragment>}
                    {item.paymentTransaction.id === highlightId &&
                        <span className="spc--left--lrg">
                            <span className='icomoon tiny icon-question-circle' data-tip data-for={`highlightId_${item.paymentTransaction.id}`} />
                            <ReactTooltip type='info' effect='solid' place="top" id={`highlightId_${item.paymentTransaction.id}`}>
                                <p>Selected Transaction</p>
                            </ReactTooltip>
                        </span>}
                </td>
            </tr>
        </React.Fragment>
    }
    else if (item.paymentTransaction) {
        return <tr key={item.paymentTransaction.id} style={item.paymentTransaction.id === highlightId ? { backgroundColor: 'khaki' } : null}>
            <td className="table__body--data">{moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}</td>
            <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={_.find(paymentTransactionTypes, { abrv: 'credit' }).id === item.paymentTransaction.paymentTransactionTypeId ? item.paymentTransaction.amount : '-' + item.paymentTransaction.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={item.paymentTransaction.userBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td className="table__body--data">
                {_.find(paymentTransactionStatuses, { id: item.paymentTransaction.paymentTransactionStatusId }).name}
                {item.paymentTransaction.description &&
                    <React.Fragment>
                        <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.paymentTransaction.id}`} />
                        <ReactTooltip type='info' effect='solid' place="top" id={`description_${item.paymentTransaction.id}`}>
                            <p>{item.paymentTransaction.description}</p>
                        </ReactTooltip>
                    </React.Fragment>}
                {item.paymentTransaction.id === highlightId &&
                    <span className="spc--left--lrg">
                        <span className='icomoon tiny icon-question-circle' data-tip data-for={`highlightId_${item.paymentTransaction.id}`} />
                        <ReactTooltip type='info' effect='solid' place="top" id={`highlightId_${item.paymentTransaction.id}`}>
                            <p>Selected Transaction</p>
                        </ReactTooltip>
                    </span>}
            </td>
        </tr>
    }
    else {
        return <tr key={item.fee.paymentTransaction.id} style={item.fee.paymentTransaction.id === highlightId ? { backgroundColor: 'khaki' } : null}>
            <td className="table__body--data">{moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}</td>
            <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={_.find(paymentTransactionTypes, { abrv: 'credit' }).id === item.fee.paymentTransaction.paymentTransactionTypeId ? item.fee.paymentTransaction.amount : '-' + item.fee.paymentTransaction.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td className="table__body--data"><NumberFormat decimalScale={2} fixedDecimalScale={true} value={item.fee.paymentTransaction.userBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td className="table__body--data">
                {_.find(paymentTransactionStatuses, { id: item.fee.paymentTransaction.paymentTransactionStatusId }).name}
                {item.fee.paymentTransaction.description &&
                    <React.Fragment>
                        <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.fee.paymentTransaction.id}`} />
                        <ReactTooltip type='info' effect='solid' place="top" id={`description_${item.fee.paymentTransaction.id}`}>
                            <p>{item.fee.paymentTransaction.description}</p>
                        </ReactTooltip>
                    </React.Fragment>}
                {item.fee.paymentTransaction.id === highlightId &&
                    <span className="spc--left--lrg">
                        <span className='icomoon tiny icon-question-circle' data-tip data-for={`highlightId_${item.fee.paymentTransaction.id}`} />
                        <ReactTooltip type='info' effect='solid' place="top" id={`highlightId_${item.fee.paymentTransaction.id}`}>
                            <p>Selected Transaction</p>
                        </ReactTooltip>
                    </span>}
            </td>
        </tr>
    }
};

export default defaultTemplate(PaymentTransactionTableRowTemplate);