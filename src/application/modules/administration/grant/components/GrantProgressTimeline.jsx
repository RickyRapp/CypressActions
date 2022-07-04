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
        console.log("status", statusList)
        statusList.forEach((stat) => {
            if (stat.abrv == 'payment-received')
                paymentReceivedStatus = stat;
            if (stat.abrv == 'payment-submited')
                paymentSubmitedStatus = stat;
            if (stat.abrv == 'approved')
                approvedStatus = stat;
            else if (stat.abrv == 'canceled')
                canceledStatus = stat;
            else if (stat.abrv == 'declined')
                declinedStatus = stat;

        })
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

                    {!declinedStatus && !canceledStatus && approvedStatus && approvedStatus.abrv == 'approved' &&
                        <div>
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

                            {paymentSubmitedStatus && paymentSubmitedStatus.currentStatus == 'payment-submited' &&
                                <div className="col col-sml-12 col-lrg-4">
                                    <div className="type--base type--wgt--medium type--color--note">{t('3.Payment submited')}</div>
                                    <span className="input--preview">
                                        <FormatterResolver
                                            item={{ dateCreated: paymentSubmitedStatus.dateCreated }}
                                            field='dateCreated'
                                            format={{ type: 'date', value: 'short' }}
                                        />
                                    </span>
                                </div>
                            }
                            {paymentReceivedStatus && paymentReceivedStatus.currentStatus == 'payment-received' &&
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
                            }
                        </div>
                    }


                    {/* 
                            <div className="col col-sml-12 col-lrg-4">
                                <div className="type--base type--wgt--medium type--color--note">{t('3. Grant payment submitted')}</div>
                                <span className="input--preview">
                                    {item && item.debitCharityTransaction ?
                                        <React.Fragment>
                                            <FormatterResolver
                                                item={{ dateCreated: item.debitCharityTransaction.dateCreated }}
                                                field='dateCreated'
                                                format={{ type: 'date', value: 'short' }}
                                            />
                                            {item.debitCharityTransaction.paymentType.abrv === 'check' &&
                                                <React.Fragment>
                                                    <div>Check number: {item.debitCharityTransaction.paymentNumber}</div>
                                                    <div>Address: <FormatterResolver
                                                        item={{
                                                            recipientAddress: {
                                                                addressLine1: item.debitCharityTransaction.recipientAddressLine1,
                                                                adddressLine2: item.debitCharityTransaction.recipientAddressLine2,
                                                                city: item.debitCharityTransaction.recipientCity,
                                                                state: item.debitCharityTransaction.recipientState,
                                                                zipCode: item.debitCharityTransaction.recipientZipCode
                                                            }
                                                        }}
                                                        field='recipientAddress'
                                                        format={{ type: 'address', value: 'full' }}
                                                    /></div>
                                                    {item.debitCharityTransaction.attOf &&
                                                        <div>Att Of: {item.debitCharityTransaction.attOf}</div>}
                                                </React.Fragment>}
                                        </React.Fragment>
                                        : ''}
                                </span>
                            </div> */}
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
