import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';

class ContributionProgressTimeline extends Component {
    render() {
        const { item, t, statusList } = this.props;
        var fundedStatus = null;
        var canceledStatus = null;
        var declinedStatus = null;
        var inProcessStatus = null;
        var pendingStatus = null;
        console.log(statusList)
        if (statusList != null) {
            statusList.forEach(stat => {
                if (stat.abrv == 'pending')
                    pendingStatus = stat;
                if (stat.abrv == 'in-process')
                    inProcessStatus = stat;
                if (stat.abrv == 'funded')
                    fundedStatus = stat;
                else if (stat.abrv == 'canceled')
                    canceledStatus = stat;
                else if (stat.abrv == 'declined')
                    declinedStatus = stat;
            });
        }


        return (
            <React.Fragment>
                <div className="row">
                    {pendingStatus && pendingStatus.abrv == 'pending' && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('1.Initiated')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: pendingStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}
                    {canceledStatus && canceledStatus.abrv == 'canceled' && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('4.Canceled')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: canceledStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {declinedStatus && declinedStatus.abrv == 'declined' && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('4.Declined')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: declinedStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {!declinedStatus && !canceledStatus && inProcessStatus && inProcessStatus.abrv == 'in-process' &&
                        <div className='row'>
                            <div className="col col-sml-12 col-lrg-4">
                                <div className="type--base type--wgt--medium type--color--note">{t('2.In process')}</div>
                                <span className="input--preview">
                                    <FormatterResolver
                                        item={{ dateCreated: inProcessStatus.dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                </span>
                            </div>


                        </div>
                    }

{!declinedStatus && !canceledStatus && fundedStatus && fundedStatus.currentStatus == 'funded' &&
                                <div className="col col-sml-12 col-lrg-4">
                                    <div className="type--base type--wgt--medium type--color--note">{t('3.Settled')}</div>
                                    <span className="input--preview">
                                        <FormatterResolver
                                            item={{ dateCreated: fundedStatus.dateCreated }}
                                            field='dateCreated'
                                            format={{ type: 'date', value: 'short' }}
                                        />
                                    </span>
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

ContributionProgressTimeline.propTypes = {
    item: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionProgressTimeline);
