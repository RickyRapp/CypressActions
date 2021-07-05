import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function TransferConfirmTemplate({ modalParams, t }) {
    const {
        form,
        onCancel,
    } = modalParams.data;

    return (
        <div className="modal__list__wrap">

            <h3 className="u-mar--bottom--med">{t('CONTRIBUTION.CONFIRM.TITLE')}</h3>
            <section className="modal__list u-mar--bottom--med">
                <div>{t('CONTRIBUTION.CONFIRM.PAYMENT_TYPE')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{form.$('contactInformationName').value}</div>
            </section>

            <section className="modal__list u-mar--bottom--med">
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
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label={t('EDIT_FORM_LAYOUT.CANCEL')}
                    onClick={onCancel}
                />

                <div className="u-mar--left--auto">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} label={'CONTRIBUTION.CREATE.COMPLETE_DEPOSIT'} />
                </div>
            </div>
        </div>
    );
}

TransferConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(TransferConfirmTemplate);