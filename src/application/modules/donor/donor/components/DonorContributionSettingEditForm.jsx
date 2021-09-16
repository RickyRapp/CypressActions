import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    EditFormContent,
    NumericInputField,
    DatePickerField,
    BaasicFormControls,
    BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorEmailAddressEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { formContributionSetting, donorBankAccountDropdownStore } = modalParams.data;

        return (
            <section >
                <EditFormContent form={formContributionSetting}>
                    <h3 className=" u-mar--bottom--med">{t('DONOR_CONTRIBUTION_SETTING.EDIT.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-6">
                            <NumericInputField field={formContributionSetting.$('amount')} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <BaasicFieldDropdown
                                field={formContributionSetting.$('donorBankAccountId')}
                                store={donorBankAccountDropdownStore} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <DatePickerField field={formContributionSetting.$('startDate')} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <BasicFieldCheckbox field={formContributionSetting.$('isEnabled')} />
                        </div>
                    </div>

                    <BaasicFormControls form={formContributionSetting} onSubmit={formContributionSetting.onSubmit} className="btn btn--base btn--secondary u-push" />
                </EditFormContent>
            </section>
        );
    }
}

DonorEmailAddressEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorEmailAddressEditForm);
