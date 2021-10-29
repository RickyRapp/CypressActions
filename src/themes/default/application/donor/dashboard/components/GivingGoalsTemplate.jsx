import React from 'react';
import { BaasicButton, BaasicFormControls, BasicFieldCheckbox, BasicInput, /*BasicRadio,*/ NumericInputField } from 'core/components';
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
        data: { form } //bankAccountDropdownStore
    } = modalParams;
    return (
        <div className="modal__list__wrap">

            <h3 className="u-mar--bottom--med">{form.$('isYearly').value == 'true' ? t('DASHBOARD.NEW_YEARLY_INCOME'):t('DASHBOARD.NEW_ONETIME_INCOME')}</h3>
            {/* <section className="u-mar--bottom--med">
                <BasicRadio label={'Yearly income'} value={'true'} field={form.$('isYearly')}/>
                <BasicRadio label={'One-Time income'} value={'false'} field={form.$('isYearly')}/>
            </section> */}
            <section className="u-mar--bottom--med">
                <div className="u-mar--bottom--med">
                    <NumericInputField field={form.$('amount')} />
                </div>
                <NumericInputField field={form.$('percentage')} />
            </section>
            {form.$('isYearly').value == 'true' ? null :
                <section className="u-mar--bottom--med">
                    <BasicInput field={form.$('note')} />
                </section>
            }
            {form ? null : <div>
                <section className="u-mar--bottom--med">
                    <BasicFieldCheckbox field={form.$('autoMonthlyContribution')} label="Set up automatic monthly contribution?" />
                </section>
                <section className="u-mar--bottom--med">
                    <BasicFieldCheckbox field={form.$('autoDeduction')} label="Automatically deduct from my bank account?" />
                </section>
            </div>}

            {/* <section className="u-mar--bottom--lrg" style={{display: 'none'}}>
                <BaasicFieldDropdown field={form.$('donorBankAccountId')} store={bankAccountDropdownStore} value={null}/>
            </section> */}
            <div className="u-display--flex">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label={t('EDIT_FORM_LAYOUT.CANCEL')}
                    onClick={() => modalParams.close()}
                />

                <div className="u-mar--left--auto">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} label={'FORM_CONTROLS.SAVE_BUTTON'} />
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