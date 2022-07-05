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

        console.log(statusList)
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
                <div className="row">
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('1.Initiated')}</div>
                        <span className="input--preview">
                            {item && <FormatterResolver
                                item={{ dateCreated: item.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />}
                        </span>
                    </div>
                    {canceledStatus && canceledStatus.abrv == 'canceled' && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('2.Canceled')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: canceledStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {declinedStatus && declinedStatus.abrv == 'declined' && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('2.Declined')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: declinedStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {!declinedStatus && !canceledStatus && approvedStatus && (approvedStatus.abrv == 'approved' || approvedStatus.currentStatus == 'approved') &&
                        <div className='row'>
                            <div className="col col-sml-12 col-lrg-4">
                                <div className="type--base type--wgt--medium type--color--note">{t('2.Approved')}</div>
                                <span className="input--preview">
                                    <FormatterResolver
                                        item={{ dateCreated: approvedStatus.dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                </span>
                            </div>

                            {!declinedStatus && !canceledStatus && paymentSubmitedStatus && (paymentSubmitedStatus.currentStatus == 'payment-submited' || paymentSubmitedStatus.abrv == 'payment-submited') ?
                                <div className="col col-sml-12 col-lrg-4">
                                    <div className="type--base type--wgt--medium type--color--note">{t('3.Submited')}</div>
                                    <span className="input--preview">
                                        <FormatterResolver
                                            item={{ dateCreated: paymentSubmitedStatus.dateCreated }}
                                            field='dateCreated'
                                            format={{ type: 'date', value: 'short' }}
                                        />
                                    </span>
                                </div>
                                :
                                <div className="col col-sml-12 col-lrg-4">
                                    <div className="type--base type--wgt--medium type--color--note">{t('3.Submited')}</div>
                                </div>
                            }

                            {!declinedStatus && !canceledStatus && paymentReceivedStatus && (paymentReceivedStatus.currentStatus == 'payment-received' || paymentReceivedStatus.abrv == 'payment-received') ?
                                <div className="col col-sml-12 col-lrg-4">
                                    <div className="type--base type--wgt--medium type--color--note">{t('4.Cashed')}</div>
                                    <span className="input--preview">
                                        <FormatterResolver
                                            item={{ dateCreated: paymentReceivedStatus.dateCreated }}
                                            field='dateCreated'
                                            format={{ type: 'date', value: 'short' }}
                                        />
                                    </span>
                                </div>
                                :
                                <div className="col col-sml-12 col-lrg-4">
                                    <div className="type--base type--wgt--medium type--color--note">{t('4.Cashed')}</div>
                                </div>
                            }
                        </div>
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
