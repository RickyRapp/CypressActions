import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
//import propTypes from 'prop-types';

/*Grant acknowledgment name: ${this.grantAcknowledgmentName}
        \n\r
        Recepient charity: ${this.charityDropdownStore.value.name}
        \n\r
        Given amount: $${this.form.$('amount').$value}`), async () => {
 */

function GrantConfirmTemplate({ modalParams, t }) {
    const {
        form,
        grantAcknowledgmentName,
        charity,
        amount,
        date,
        recurring,
        purpose,
        onCancel
    } = modalParams.data;
    return (
        <div className="modal__list__wrap">

            <h3 className="u-mar--bottom--med">{t('GRANT.CONFIRM.TITLE')}</h3>
            <section className="u-mar--bottom--med">
                <div className="type--wgt--bold">{t('GRANT.CONFIRM.GRANT_ACKNOWLEDGMENT_NAME')}</div>
                <div>{grantAcknowledgmentName}</div>
            </section>

            <section className="modal__list u-mar--bottom--med">
                <div>{t('GRANT.CONFIRM.RECEPIENT_CHARITY')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount--secondary">{charity && charity.item ? charity.item.name : (typeof charity.item == 'undefined' ? charity.name : <div><b>{form.$('charityName').value}</b><span>&nbsp;(new)</span></div>)}</div>
            </section>
            <section className="modal__list u-mar--bottom--med">
                <div>{t('GRANT.CONFIRM.GIVEN_AMOUNT')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">
                    <FormatterResolver
                        item={{ amount: amount }}
                        field='amount'
                        format={{ type: 'currency' }}
                    />
                </div>
            </section>
            <section className="modal__list u-mar--bottom--med">
                <div>{t('GRANT.CONFIRM.SCHEDULED_DATE')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{date}</div>
            </section>
            {
                form.$('isRecurring').value &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('GRANT.CONFIRM.RECURRING')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{recurring}</div>
                </section>
            }

            <section className="modal__list u-mar--bottom--med">
                <div>{t('GRANT.CONFIRM.PURPOSE')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount--secondary">{purpose.name} {form.$('purposeNote').value.length > 0 ? ` - ${form.$('purposeNote').value}` : null}</div>
            </section>

            <div className="u-display--flex">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label={t('EDIT_FORM_LAYOUT.CANCEL')}
                    onClick={onCancel}
                />

                <div className="u-mar--left--auto">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} label={'GRANT.CONFIRM.GIVE_GRANT'} />
                </div>
            </div>
        </div>
    );
}

GrantConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantConfirmTemplate);