import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function ContributionConfirmTemplate({ modalParams, t }) {
    const {
        form,
        onCancel,
        paymentType,
        bankAccount,
        brokerageInstitution,
        securityType,
        securitySymbol,
        numberOfShares,
        thirdPartyDonorAdvisedFund,
        checkNumber,
        businessType,
        propertyType,
        propertyTypeTellUsMode,
        collectableType
    } = modalParams.data;

    const styleSection = {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '10px',
    }

    const styleChild = {
        padding: '0',
        margin: '0'
    }

    const styleSpan = {
        padding: '0',
        margin: '0',
        flex: '1',
        overflow: 'hidden'
    }

    return (
        <div className="row w--600--px">
            <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                <h3 className="">{t('CONTRIBUTION.CONFIRM.TITLE')}</h3>
            </div>
            <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                <section style={styleSection}>
                    <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.PAYMENT_TYPE')}</div>
                    <span style={styleSpan}>   .........................................................................................................................................................   </span>
                    <div style={styleChild}>{paymentType.name}</div>
                </section>
            </div>
            {bankAccount &&
                <React.Fragment>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <section style={styleSection}>
                            <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.BANK_ACCOUNT')}</div>
                            <span style={styleSpan}>   .........................................................................................................................................................   </span>
                            <div style={styleChild}>{bankAccount.name}</div>
                        </section>
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <section style={styleSection}>
                            <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.BANK_ACCOUNT_NUMBER')}</div>
                            <span style={styleSpan}>   .........................................................................................................................................................   </span>
                            <div>xxxx-xxxx-xxxx-{bankAccount.accountNumber}</div>
                        </section>
                    </div>
                </React.Fragment>}
            {securitySymbol &&
                <React.Fragment>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <section style={styleSection}>
                            <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.BROKERAGE_INSTITUTION')}</div>
                            <span style={styleSpan}>   .........................................................................................................................................................   </span>
                            <div style={styleChild}>{brokerageInstitution}</div>
                        </section>
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <section style={styleSection}>
                            <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.SECURITY_TYPE')}</div>
                            <span style={styleSpan}>   .........................................................................................................................................................   </span>
                            <div>{securityType}</div>
                        </section>
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <section style={styleSection}>
                            <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.SECURITY_SYMBOL')}</div>
                            <span style={styleSpan}>   .........................................................................................................................................................   </span>
                            <div>{securitySymbol}</div>
                        </section>
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <section style={styleSection}>
                            <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.NUMBER_OF_SHARES')}</div>
                            <span style={styleSpan}>   .........................................................................................................................................................   </span>
                            <div>{numberOfShares}</div>
                        </section>
                    </div>
                </React.Fragment>}
            {thirdPartyDonorAdvisedFund &&
                <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <section style={styleSection}>
                        <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.THIRD_PARTY_DONOR_ADVISED_FUND')}</div>
                        <span style={styleSpan}>   .........................................................................................................................................................   </span>
                        <div style={styleChild}>{thirdPartyDonorAdvisedFund}</div>
                    </section>
                </div>}
            {checkNumber &&
                <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <section style={styleSection}>
                        <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.CHECK_NUMBER')}</div>
                        <span style={styleSpan}>   .........................................................................................................................................................   </span>
                        <div style={styleChild}>{checkNumber}</div>
                    </section>
                </div>}
            {businessType &&
                <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <section style={styleSection}>
                        <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.BUSINESS_TYPE')}</div>
                        <span style={styleSpan}>   .........................................................................................................................................................   </span>
                        <div style={styleChild}>{businessType}</div>
                    </section>
                </div>}
            {propertyType &&
                <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <section style={styleSection}>
                        <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.PROPERTY_TYPE')}</div>
                        <span style={styleSpan}>   .........................................................................................................................................................   </span>
                        <div style={styleChild}>{propertyType}</div>
                    </section>
                </div>}
            {collectableType &&
                <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <section style={styleSection}>
                        <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.COLLECTABLE_TYPE')}</div>
                        <span style={styleSpan}>   .........................................................................................................................................................   </span>
                        <div style={styleChild}>{collectableType}</div>
                    </section>
                </div>}
            <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
                <section style={styleSection}>
                    <div style={styleChild}>{t('CONTRIBUTION.CONFIRM.AMOUNT')}</div>
                    <span style={styleSpan}>   .........................................................................................................................................................   </span>
                    <div style={styleChild}>
                        <FormatterResolver
                            item={{ amount: form.$('amount').value }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                    </div>
                </section>
            </div>
            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--med">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label={t('EDIT_FORM_LAYOUT.CANCEL')}
                    onClick={onCancel}
                />
            </div>
            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--med type--right">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} label={'CONTRIBUTION.CREATE.COMPLETE_DEPOSIT'} />
            </div>
        </div>
    );
}

ContributionConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionConfirmTemplate);