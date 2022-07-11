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

        return (
            <React.Fragment>
                <div className="wizard">
                    <div className="wizard__item">
                        <div className="wizard__item__title">{t('1.Initiated')}</div>
                        <span className="wizard__item__value">
                            {item && <FormatterResolver
                                item={{ dateCreated: item.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />}
                        </span>
                    </div>

                    {canceledStatus && canceledStatus.abrv == 'canceled' && <div className="wizard__item">
                        <div className="wizard__item__title">{t('2.Canceled')}</div>
                        <span className="wizard__item__value">
                            <FormatterResolver
                                item={{ dateCreated: canceledStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {declinedStatus && declinedStatus.abrv == 'declined' && <div className="wizard__item">
                        <div className="wizard__item__title">{t('2.Declined')}</div>
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
                            <div className="wizard__item">
                                <div className="wizard__item__title">{t('2.Approved')}</div>
                                <span className="wizard__item__value">
                                    <FormatterResolver
                                        item={{ dateCreated: approvedStatus.dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                </span>
                            </div>

                            {!declinedStatus && !canceledStatus && paymentSubmitedStatus && (paymentSubmitedStatus.currentStatus == 'payment-submited' || paymentSubmitedStatus.abrv == 'payment-submited') ?
                                <div className="wizard__item">
                                    <div className="wizard__item__title">{t('3.Submited')}</div> 
                                    <span className="wizard__item__value">
                                        <FormatterResolver
                                            item={{ dateCreated: paymentSubmitedStatus.dateCreated }}
                                            field='dateCreated'
                                            format={{ type: 'date', value: 'short' }}
                                        />
                                    </span>
                                </div>
                                :
                                <div className="wizard__item">
                                    <div className="wizard__item__title">{t('3.Submited')}</div>
                                </div>
                            }

                            {!declinedStatus && !canceledStatus && paymentReceivedStatus && (paymentReceivedStatus.currentStatus == 'payment-received' || paymentReceivedStatus.abrv == 'payment-received') ?
                                <div className="wizard__item">
                                    <div className="wizard__item__title">{t('4.Cashed')}</div>
                                    <span className="wizard__item__value">
                                        <FormatterResolver
                                            item={{ dateCreated: paymentReceivedStatus.dateCreated }}
                                            field='dateCreated'
                                            format={{ type: 'date', value: 'short' }}
                                        />
                                    </span>
                                </div>
                                :
                                <div className="wizard__item">
                                    <div className="wizard__item__title">{t('4.Cashed')}</div>
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
