import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    EditFormContent,
    BaasicFormControls,
    NumberFormatInputField
} from 'core/components'

const DonorGivingCardActivationTemplate = function ({ t, modalParams }) {
    const {
        data: { form }
    } = modalParams;

    return (
        <div>
            <EditFormContent form={form} >
                <h3 className=" u-mar--bottom--sml">{t('DONOR_GIVING_CARD_SETTING.ACTIVATION.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-sml-12 col-xlrg-6">
                        <NumberFormatInputField field={form.$('cardNumber')} />
                    </div>
                    <div className="form__group col col-sml-12 col-xlrg-3">
                        <NumberFormatInputField field={form.$('cvv')} />
                    </div>
                    <div className="form__group col col-sml-12 col-xlrg-3">
                        <NumberFormatInputField field={form.$('expirationDate')} />
                    </div>
                </div>
                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorGivingCardActivationTemplate.propTypes = {
    modelParams: PropTypes.object,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorGivingCardActivationTemplate);
