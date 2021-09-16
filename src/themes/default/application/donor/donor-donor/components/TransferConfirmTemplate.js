import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function TransferConfirmTemplate({ modalParams, t }) {
    const {
        form,
        item,
        item2,
        accNumber,
        onCancel,
        recipient2
    } = modalParams.data;

    return (

        <div className="modal__list__wrap">
            <h3 className="u-mar--bottom--med">{t('DONOR-DONOR.CONFIRM.TITLE')}</h3>
            {item &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('DONOR-DONOR.CONFIRM.DONOR_NAME')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{item}</div>
                </section>
            }

            <section className="modal__list u-mar--bottom--med">
                <div> {!accNumber ? t('DONOR-DONOR.CONFIRM.EMAIL') : t('DONOR-DONOR.CONFIRM.ACCOUNT_NUMBER')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{form.$('emailOrAccountNumber').value}</div>
            </section>

            {item2 && recipient2 &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('DONOR-DONOR.CONFIRM.SECOND_DONOR_NAME')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{item2}</div>
                </section>
            }
            {recipient2 &&
            <section className="modal__list u-mar--bottom--med">
                <div> {!accNumber ? t('DONOR-DONOR.CONFIRM.SECOND_EMAIL') : t('DONOR-DONOR.CONFIRM.ACCOUNT_NUMBER')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{form.$('emailOrAccountNumberAnother').value}</div>
            </section>}

            <section className="modal__list u-mar--bottom--med">
                <div>{t('DONOR-DONOR.CONFIRM.AMOUNT')}</div>
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
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} label={'DONOR-DONOR.CREATE.COMPLETE_GIFT'} />
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