import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function ContributionConfirmTemplate({ modalParams, t }) {
    const {
        form,
        onCancel,
        paymentType,
        bankAccount
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
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--med type--right">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label={t('EDIT_FORM_LAYOUT.CANCEL')}
                    onClick={onCancel}
                />
            </div>
        </div>
    );
}

ContributionConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionConfirmTemplate);