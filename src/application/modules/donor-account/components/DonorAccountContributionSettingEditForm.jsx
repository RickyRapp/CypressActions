import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFieldDropdown,
    EditFormContent,
    NumericInputField,
    DatePickerField,
    BaasicFormControls,
    BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorAccountEmailAddressEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { formContributionSetting, donorAccountBankAccountDropdownStore } = modalParams.data;

        return (
            <section className='w--600--px'>
                <EditFormContent form={formContributionSetting}>
                    <h3 className="u-mar--bottom--med">{t('DONOR_ACCOUNT_CONTRIBUTION_SETTING.EDIT.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-6">
                            <NumericInputField field={formContributionSetting.$('amount')} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <BaasicFieldDropdown
                                field={formContributionSetting.$('donorAccountBankAccountId')}
                                store={donorAccountBankAccountDropdownStore} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <DatePickerField field={formContributionSetting.$('startDate')} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <BasicFieldCheckbox field={formContributionSetting.$('isEnabled')} />
                        </div>
                    </div>

                    <BaasicFormControls form={formContributionSetting} onSubmit={formContributionSetting.onSubmit} />
                </EditFormContent>
            </section>
        );
    }
}

DonorAccountEmailAddressEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorAccountEmailAddressEditForm);
