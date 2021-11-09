import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function TransferConfirmTemplate({ modalParams, t }) {
    const {
        form,
        onCancel,
        brokerageInstitution,
        securityType,
        searchDonorDropdownStore
    } = modalParams.data;
    return (

        <div className="modal__list__wrap">
            <h3 className="u-mar--bottom--med">{t('DONOR-DONOR.CONFIRM.TITLE')}</h3>
            
            <section className="modal__list u-mar--bottom--med">
                <div>{t('ACCEPT-SECURITY.CREATE.DONOR')}:&nbsp;</div>
                <div className="modal__list__amount--secondary">{searchDonorDropdownStore && searchDonorDropdownStore.name}</div>
            </section>

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
            
            <section className="modal__list u-mar--bottom--med">
                <div>{t('ACCEPT-SECURITY.CREATE.BROKERAGE_INSTITUTION')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{brokerageInstitution && brokerageInstitution.name}</div>
            </section>
            
            <section className="modal__list u-mar--bottom--med">
                <div>{t('ACCEPT-SECURITY.CREATE.SECURITY_TYPE')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{securityType && securityType.name}</div>
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