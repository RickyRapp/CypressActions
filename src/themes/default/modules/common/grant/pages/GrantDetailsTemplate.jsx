import React from 'react';
import { defaultTemplate } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';
import { Loader } from 'core/components';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip'

function GrantDetailsTemplate({ grantDetailsViewStore }) {
    const {
        grant,
        loaderStore,
        paymentTransactionStatuses,
        paymentTransactionTypes,
        highlightId
    } = grantDetailsViewStore;

    return (
        <React.Fragment>
            {loaderStore.loading &&
                <Loader />}
            {grant &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Charity</strong>
                            {grant.charity.name}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Amount</strong>
                            {grant.amount}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Description</strong>
                            {grant.description}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Created</strong>
                            {moment(grant.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Updated</strong>
                            {moment(grant.dateUpdated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <strong>Payment Transactions</strong>
                        </div>

                        {grant.grantDonorAccountTransactions.sort(function (a, b) { return new Date(a.dateCreated) - new Date(b.dateCreated) }).map(item => {
                            return (
                                <React.Fragment>
                                    <div className="form__group f-col f-col-lrg-12" key={item.paymentTransaction.id} style={item.paymentTransaction.id === highlightId ? { backgroundColor: 'lightgray' } : null}>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <strong>Date Created</strong>
                                            {moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <strong>Amount</strong>
                                            {_.find(paymentTransactionTypes, { abrv: 'credit' }).id === item.paymentTransaction.paymentTransactionTypeId ? item.paymentTransaction.amount : '-' + item.paymentTransaction.amount}
                                            {item.paymentTransaction.description &&
                                                <React.Fragment>
                                                    <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.paymentTransaction.id}`} />
                                                    <ReactTooltip type='info' effect='solid' place="right" id={`description_${item.paymentTransaction.id}`}>
                                                        <p>{item.paymentTransaction.description}</p>
                                                    </ReactTooltip>
                                                </React.Fragment>}
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <strong>Balance</strong>
                                            {item.paymentTransaction.userBalance}
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <strong>Status</strong>
                                            {_.find(paymentTransactionStatuses, { id: item.paymentTransaction.paymentTransactionStatusId }).name}
                                            {item.paymentTransaction.id === highlightId &&
                                                <span className="spc--left--lrg">
                                                    <span className='icomoon tiny icon-question-circle' data-tip data-for={`highlightId_${item.paymentTransaction.id}`} />
                                                    <ReactTooltip type='info' effect='solid' place="right" id={`highlightId_${item.paymentTransaction.id}`}>
                                                        <p>Selected Transaction</p>
                                                    </ReactTooltip>
                                                </span>}
                                        </div>
                                    </div>
                                    {item.fee &&
                                        <React.Fragment>
                                            <div className="form__group f-col f-col-lrg-12" key={item.fee.paymentTransaction.id} style={item.fee.paymentTransaction.id === highlightId ? { backgroundColor: 'lightgray' } : null}>
                                                <div className="form__group f-col f-col-lrg-3">
                                                    <strong>Date Created</strong>
                                                    {moment(item.dateCreated).format('YYYY-MM-DD HH:mm')}
                                                </div>
                                                <div className="form__group f-col f-col-lrg-3">
                                                    <strong>Amount</strong>
                                                    {_.find(paymentTransactionTypes, { abrv: 'credit' }).id === item.fee.paymentTransaction.paymentTransactionTypeId ? item.fee.paymentTransaction.amount : '-' + item.fee.paymentTransaction.amount}
                                                    {item.fee.paymentTransaction.description &&
                                                        <React.Fragment>
                                                            <span className='icomoon tiny icon-alert-circle' data-tip data-for={`description_${item.fee.paymentTransaction.id}`} />
                                                            <ReactTooltip type='info' effect='solid' place="right" id={`description_${item.fee.paymentTransaction.id}`}>
                                                                <p>{item.fee.paymentTransaction.description}</p>
                                                            </ReactTooltip>
                                                        </React.Fragment>}
                                                </div>
                                                <div className="form__group f-col f-col-lrg-3">
                                                    <strong>Balance</strong>
                                                    {item.fee.paymentTransaction.userBalance}
                                                </div>
                                                <div className="form__group f-col f-col-lrg-3">
                                                    <strong>Status</strong>
                                                    {_.find(paymentTransactionStatuses, { id: item.fee.paymentTransaction.paymentTransactionStatusId }).name}
                                                    {item.fee.paymentTransaction.id === highlightId &&
                                                        <span className="spc--left--lrg">
                                                            <span className='icomoon tiny icon-question-circle' data-tip data-for={`highlightId_${item.fee.paymentTransaction.id}`} />
                                                            <ReactTooltip type='info' effect='solid' place="right" id={`highlightId_${item.fee.paymentTransaction.id}`}>
                                                                <p>Selected Transaction</p>
                                                            </ReactTooltip>
                                                        </span>}
                                                </div>
                                            </div>
                                        </React.Fragment>}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </React.Fragment>}
        </React.Fragment>
    );
};

export default defaultTemplate(GrantDetailsTemplate);
