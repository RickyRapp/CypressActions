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
        <div className="modal__list__wrap">
            <h3 className="u-mar--bottom--med">{t('CONTRIBUTION.CONFIRM.TITLE')}</h3>
            <section className="modal__list">
                <div>{t('CONTRIBUTION.CONFIRM.PAYMENT_TYPE')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{paymentType.name}</div>
            </section>

            {bankAccount &&
                <React.Fragment>
                    <section className="modal__list">
                        <div>{t('CONTRIBUTION.CONFIRM.BANK_ACCOUNT')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{bankAccount.name}</div>
                    </section>
                    <section className="modal__list">
                        <div>{t('CONTRIBUTION.CONFIRM.BANK_ACCOUNT_NUMBER')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">xxxx-xxxx-xxxx-{bankAccount.accountNumber}</div>
                    </section>
                </React.Fragment>}
                <section className="modal__list">
                    <div>{t('CONTRIBUTION.CONFIRM.AMOUNT')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">
                         <FormatterResolver
                            item={{ amount: form.$('amount').value }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                    </div>
                </section>
                <div className="u-display--flex">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                    <div className="u-mar--left--auto">
                        <BaasicButton
                            className="btn btn--med btn--med--wide btn--ghost"
                            label={t('EDIT_FORM_LAYOUT.CANCEL')}
                            onClick={onCancel}
                        />
                    </div>
                </div>
        </div>
    );
}

ContributionConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionConfirmTemplate);