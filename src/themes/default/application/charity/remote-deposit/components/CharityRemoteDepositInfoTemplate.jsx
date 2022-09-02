/* eslint-disable react/prop-types */
import React from 'react'
import { FormatterResolver } from 'core/components';
import { CardItem } from 'themes/components';

const CharityRemoteDepositInfoTemplate = ({ sessionCertificates, charity, t }) => {
    return (
        <div>
             {/* <CardItem label={"Charity"} /> */}
            <div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
                <div className="card--tny card--secondary card--inline u-mar--bottom--sml">
                    <span className="type--base type--wgt--medium type--color--opaque">
                        
                    </span>
                    <span className="type--base type--wgt--bold u-push w--400--px">
                        {charity.label}
                    </span>
                </div>
            </div>

            <div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
                <div className="card--tny card--secondary u-mar--bottom--sml">
                    <span className="type--base type--wgt--medium type--color--opaque">
                        Checks scanned
                    </span>
                    <span className="type--base type--wgt--bold u-push">
                        {`${sessionCertificates.length}`}
                    </span>
                </div>

                <div className="card--tny card--secondary u-mar--bottom--sml">
                    <span className="type--base type--wgt--medium type--color--opaque">
                        {t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}
                    </span>
                    <span className="type--base type--wgt--bold u-push">
                        {sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
                            item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />}
                    </span>
                </div>

                <div className="card--tny card--secondary u-mar--bottom--sml">
                    <span className="type--base type--wgt--medium type--color--opaque">
                        Fees
                    </span>
                    <span className="type--base type--wgt--bold u-push">
                        {sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
                            item={{ amount: (sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) - sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b)) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />}
                    </span>
                </div>

                <div className="card--tny card--secondary u-mar--bottom--sml">
                    <span className="type--base type--wgt--medium type--color--opaque">
                        Total (before fees)
                    </span>
                    <span className="type--base type--wgt--bold u-push">
                        {sessionCertificates.length > 0 && <FormatterResolver
                            item={{ amount: sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />}
                    </span>
                </div>

                <div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
                    <div className="card--tny card--secondary u-mar--bottom--sml">
                        <span className="type--base type--wgt--medium type--color--opaque">
                            Insufficient checks
                        </span>
                        <span className="type--base type--wgt--bold u-push">
                            {sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
                                item={{ amount: sessionCertificates.filter(c => c.insufficientFunds).map(c => c.certificateValue).reduce((a, b) => a + b, 0) }}
                                field='amount'
                                format={{ type: 'currency' }}
                            />}
                        </span>
                    </div>

                    <div className="card--tny card--secondary u-mar--bottom--sml">
                        <span className="type--base type--wgt--medium type--color--opaque">
                            <span className=" type--color--note">Grand total</span> (including insufficient checks)
                        </span>
                        <span className="type--base type--wgt--bold u-push">
                            {sessionCertificates.length > 0 && <FormatterResolver
                                item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
                                field='amount'
                                format={{ type: 'currency' }}
                            />}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharityRemoteDepositInfoTemplate