import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicFieldCheckbox,
    BaasicFieldDropdown,
    NumericInputField
} from 'core/components'

const DonorAccountAutomaticContributionSettingTemplate = function ({ t, donorAccountAutomaticContributionSettingViewStore }) {
    const {
        loaderStore,
        form,
        bankAccountDropdownStore,
        onChangeIsEnabled
    } = donorAccountAutomaticContributionSettingViewStore;

    return (
        <EditFormContent form={form}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
            layoutFoot
        >
            <h3 className="u-mar--bottom--tny">{t('DONOR_ACCOUNT.AUTOMATIC_CONTRIBUTION_SETTING.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-lrg-4">
                    <BasicFieldCheckbox field={form.$('isEnabled')} onChange={onChangeIsEnabled} />
                </div>
            </div>
            <div className="row">
                <div className="form__group col col-lrg-4">
                    <BaasicFieldDropdown field={form.$('donorAccountBankAccountId')} store={bankAccountDropdownStore} />
                </div>
                <div className="form__group col col-lrg-4">
                    <NumericInputField field={form.$('amount')} />
                </div>
                <div className="form__group col col-lrg-4">
                    <NumericInputField field={form.$('lowBalanceAmount')} />
                </div>
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    )
}

DonorAccountAutomaticContributionSettingTemplate.propTypes = {
    donorAccountAutomaticContributionSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAccountAutomaticContributionSettingTemplate);
