import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';

class GrantProgressTimeline extends Component {
    render() {
        var isApproved = false;
        var isCanceled = false;
        var isDeclined = false;
        var selectedStatusDate = null;
        const { item, t, statusList } = this.props;
        console.log(statusList);
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('1. Grant initiated')}</div>
                        <span className="input--preview">
                            {item && <FormatterResolver
                                item={{ dateCreated: item.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />}
                        </span>
                    </div>
                    {statusList[0] && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">Grant {statusList[0].abrv}</div>
                        <span className="input--preview">
                            {statusList && <FormatterResolver
                                item={{ dateCreated: statusList[0].dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />}
                        </span>
                    </div>}

                    <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('2. Processed')}</div>
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
                    </div>
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('3. Cashed')}</div>
                        <span className="input--preview">
                            {item && item.debitCharityTransaction && item.debitCharityTransaction.isCashed ?
                                <FormatterResolver
                                    item={{ dateCashed: item.debitCharityTransaction.dateCashed }}
                                    field='dateCashed'
                                    format={{ type: 'date', value: 'short' }}
                                />
                                : ''}
                        </span>
                    </div>
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
