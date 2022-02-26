import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls,
    EditFormContent, BaasicFieldDropdown, NumericInputField
} from 'core/components';

function DonorAutomaticContributionEditTemplate({ modalParams, t }) {
    const {
        data: { form, bankAccountDropdownStore }
    } = modalParams;

    return (
        <EditFormContent form={form} >
            <h3 className="type--med type--wgt--medium type--color--opaque u-mar--bottom--med">{t('DONOR.AUTOMATIC_CONTRIBUTION_SETTING.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-6 col-xxxlrg-4">
                    <BaasicFieldDropdown field={form.$('donorBankAccountId')} store={bankAccountDropdownStore} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-6 col-xxxlrg-4">
                    <NumericInputField field={form.$('amount')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-6 col-xxxlrg-4">
                    <NumericInputField field={form.$('lowBalanceAmount')} />
                </div>
                <span className="u-mar--right--tny">Please note, should the auto replinsh not sufficiently cover the activity in your account, it will be subject to an automated increase</span>
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    );
}

DonorAutomaticContributionEditTemplate.propTypes = {
    modalParams: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(DonorAutomaticContributionEditTemplate);
