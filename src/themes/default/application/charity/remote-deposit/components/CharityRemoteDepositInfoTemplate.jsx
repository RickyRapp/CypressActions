/* eslint-disable react/prop-types */
import React from 'react'
import { FormatterResolver } from 'core/components';
import { CardItem } from 'themes/components';

const CharityRemoteDepositInfoTemplate = ({ sessionCertificates, charity, t }) => {
    return (
        <div className="card--primary card--med">
            <div className="u-mar--bottom--sml">
                <label className="form__group__label">Charity</label>
                <p className="type--wgt--bold">{charity.label}</p>
            </div>

            <div className="u-mar--bottom--sml">
                <label className="form__group__label">Checks scanned</label>
                <p className="type--wgt--bold">{sessionCertificates.length}</p>
            </div>

            <div className="u-mar--bottom--sml">
                <label className="form__group__label">{t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}</label>
                <p className="type--wgt--bold">
                    {sessionCertificates.length > 0 ?
                        sessionCertificates.map(c => c.insufficientFunds) &&
                        <FormatterResolver
                            item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                        :
                        "-"
                    }
                </p>
            </div>

            <div className="u-mar--bottom--sml">
                <label className="form__group__label">Fees</label>
                <p className="type--wgt--bold">
                    {sessionCertificates.length > 0 &&
                        sessionCertificates.map(c => c.insufficientFunds) ?
                        <FormatterResolver
                            item={{ amount: (sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) - sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b)) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                        :
                        "-"
                    }
                </p>
            </div>

            <div className="u-mar--bottom--sml">
                <label className="form__group__label">Total (before fees)</label>
                <p className="type--wgt--bold">
                    {sessionCertificates.length > 0 ?
                        <FormatterResolver
                            item={{ amount: sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                        :
                        "-"
                    }
                </p>
            </div>

            <div className="u-mar--bottom--sml">
                <label className="form__group__label">Insufficient checks</label>
                <p className="type--wgt--bold">
                    {sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) ?
                        <FormatterResolver
                            item={{ amount: sessionCertificates.filter(c => c.insufficientFunds).map(c => c.certificateValue).reduce((a, b) => a + b, 0) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                        :
                        "-"
                    }
                </p>
            </div>

            <div className="u-mar--bottom--sml">
                <label className="form__group__label">Grand total (including insufficient checks)</label>
                <p className="type--wgt--bold">
                    {sessionCertificates.length > 0 ?
                        <FormatterResolver
                            item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                        :
                        "-"
                    }
                </p>
            </div>
        </div>
    )
}

export default CharityRemoteDepositInfoTemplate