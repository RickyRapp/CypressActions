import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';

class GrantProgressTimeline extends Component {
    render() {
        const { item, t, statusList } = this.props;
        var approvedStatus = null;
        var canceledStatus = null;
        var declinedStatus = null;
        var paymentSubmitedStatus = null;
        var paymentReceivedStatus = null;
        var isAch = false;
        var isCbM = false;
        var isInternal = false;
        var paymentNumber = null;
     
        if (statusList != null) {
            statusList.forEach(stat => {
                if (stat.abrv == 'payment-received' || stat.currentStatus == 'payment-received')
                    paymentReceivedStatus = stat;
                if (stat.abrv == 'payment-submited' || stat.currentStatus == 'payment-submited')
                    paymentSubmitedStatus = stat;
                if (stat.abrv == 'approved' || stat.currentStatus == 'approved')
                    approvedStatus = stat;
                else if (stat.abrv == 'canceled')
                    canceledStatus = stat;
                else if (stat.abrv == 'declined')
                    declinedStatus = stat;
            });
        }
        if (item.charityVirtualTransaction && item.charityVirtualTransaction.charityWithdrawTransaction && item.charityVirtualTransaction.charityWithdrawTransaction.paymentType.abrv == 'charity-account') {
            isCbM = false;
            isAch = false;
            isInternal = true;
        }
       else if (item.charityVirtualTransaction && item.charityVirtualTransaction.charityWithdrawTransaction && item.charityVirtualTransaction.charityWithdrawTransaction.paymentType.abrv == 'ach') {
            isAch = true;
            isCbM = false;
            isInternal = false;
            paymentNumber = item.charityVirtualTransaction.charityWithdrawTransaction.paymentNumber;
        }
        else if (item.charityVirtualTransaction && item.charityVirtualTransaction.charityWithdrawTransaction && item.charityVirtualTransaction.charityWithdrawTransaction.paymentType.abrv == 'check') {
            isCbM = true;
            isAch = false;
            isInternal = false;
            if (item && item.charityVirtualTransaction && item.charityVirtualTransaction.charityWithdrawTransaction)
                paymentNumber = item.charityVirtualTransaction.charityWithdrawTransaction.paymentNumber;
        }
        else {
            return null;
        }
        console.log(item)
        console.log(statusList)
        console.log(isInternal)
        return (
            <React.Fragment>
                <div className="wizard">
                    <div className="wizard__item is-checked">
                        <div className="wizard__item__title">{t('Initiated')}</div>
                        <span className="wizard__item__value ">
                            {item && <FormatterResolver
                                item={{ dateCreated: item.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />}
                        </span>
                    </div>

                    {canceledStatus && canceledStatus.abrv == 'canceled' && <div className="wizard__item  is-checked">
                        <div className="wizard__item__title">{t('Canceled')}</div>
                        <span className="wizard__item__value">
                            <FormatterResolver
                                item={{ dateCreated: canceledStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {declinedStatus && declinedStatus.abrv == 'declined' && <div className="wizard__item  is-checked">
                        <div className="wizard__item__title">{t('Declined')}</div>
                        <span className="wizard__item__value">
                            <FormatterResolver
                                item={{ dateCreated: declinedStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {!declinedStatus && !canceledStatus && approvedStatus && (approvedStatus.abrv == 'approved' || approvedStatus.currentStatus == 'approved') &&
                        <React.Fragment>
                            <div className="wizard__item is-checked">
                                <div className="wizard__item__title">{t('Approved')}</div>
                                <span className="wizard__item__value ">
                                    <FormatterResolver
                                        item={{ dateCreated: approvedStatus.dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                </span>
                            </div>

                            {!declinedStatus && !canceledStatus && paymentSubmitedStatus && (paymentSubmitedStatus.currentStatus == 'payment-submited' || paymentSubmitedStatus.abrv == 'payment-submited') ?
                                <React.Fragment>
                                    {isInternal ?
                                        <div className="wizard__item is-checked">
                                            <div className="wizard__item__title">{t('Charity wallet - Funded')}</div>
                                            <span className="wizard__item__value">
                                                <FormatterResolver
                                                    item={{ dateCreated: paymentSubmitedStatus.dateCreated }}
                                                    field='dateCreated'
                                                    format={{ type: 'date', value: 'short' }}
                                                />
                                            </span>
                                        </div> :
                                        <React.Fragment>
                                            {isAch ?

                                                <div className="wizard__item is-checked">
                                                    <div className="wizard__item__title">{t('Ach paid')}  - {paymentNumber}</div>
                                                    <span className="wizard__item__value">
                                                        <FormatterResolver
                                                            item={{ dateCreated: paymentSubmitedStatus.dateCreated }}
                                                            field='dateCreated'
                                                            format={{ type: 'date', value: 'short' }}
                                                        />
                                                    </span>
                                                </div>
                                                :
                                                <div className="wizard__item is-checked">
                                                    <div className="wizard__item__title">{t('Check mailed')}  - {paymentNumber} </div>
                                                    <span className="wizard__item__value">
                                                        <FormatterResolver
                                                            item={{ dateCreated: paymentSubmitedStatus.dateCreated }}
                                                            field='dateCreated'
                                                            format={{ type: 'date', value: 'short' }}
                                                        />
                                                    </span>
                                                </div>
                                            }
                                        </React.Fragment>}
                                </React.Fragment>
                                :
                                <div className="wizard__item">
                                    <div className="wizard__item__title">{t('Submited')}</div>
                                </div>
                            }

                            {!declinedStatus && !canceledStatus && paymentReceivedStatus && (paymentReceivedStatus.currentStatus == 'payment-received' || paymentReceivedStatus.abrv == 'payment-received') ?
                                <React.Fragment>
                                    {isInternal ? null : <React.Fragment>
                                        {isAch ? <div className="wizard__item is-checked">
                                            <div className="wizard__item__title">{t('Ach funded')}</div>
                                            <span className="wizard__item__value">
                                                <FormatterResolver
                                                    item={{ dateCreated: paymentReceivedStatus.dateCreated }}
                                                    field='dateCreated'
                                                    format={{ type: 'date', value: 'short' }}
                                                />
                                            </span>
                                        </div> :
                                            <div className="wizard__item is-checked">
                                                <div className="wizard__item__title">{t('Check cashed')}</div>
                                                <span className="wizard__item__value">
                                                    <FormatterResolver
                                                        item={{ dateCreated: paymentReceivedStatus.dateCreated }}
                                                        field='dateCreated'
                                                        format={{ type: 'date', value: 'short' }}
                                                    />
                                                </span>
                                            </div>}
                                    </React.Fragment>}
                                </React.Fragment>
                                :
                                <div className="wizard__item ">
                                    <div className="wizard__item__title">{t('Cashed')}</div>
                                </div>
                            }
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        );
    }
}

GrantProgressTimeline.propTypes = {
    item: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantProgressTimeline);
