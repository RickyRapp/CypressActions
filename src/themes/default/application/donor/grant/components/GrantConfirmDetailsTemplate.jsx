import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function GrantConfirmDetailsTemplate({ modalParams, t }) {
    const {
        form,
        onCancel,
        onSubmit,
        grantAcknowledgmentName,
        charityName
    } = modalParams.data;

    return (
        <div className="modal__list__wrap">
            <h3 className="u-mar--bottom--med">{t('GRANT.CREATE.CONFIRM.TITLE')}</h3>
            <section className="modal__list u-mar--bottom--med">
                <div>{t('GRANT.CREATE.CONFIRM.ACKNOWLEDGEMENT_NAME')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{grantAcknowledgmentName}</div>
            </section>
            {charityName &&
                <React.Fragment>
                    <section className="modal__list u-mar--bottom--med">
                        <div>{t('GRANT.CREATE.CONFIRM.RECEPIENT_CHARITY')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{charityName}</div>
                    </section>
                </React.Fragment>}
            <section className="modal__list u-mar--bottom--med">
                <div>{t('GRANT.CREATE.CONFIRM.AMOUNT')}</div>
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
                    <BaasicFormControls form={form} onSubmit={onSubmit} label={'GRANT.CREATE.CONFIRM.CONFIRM_DETAILS'} />
                </div>
            </div>
        </div>
    );
}

GrantConfirmDetailsTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantConfirmDetailsTemplate);