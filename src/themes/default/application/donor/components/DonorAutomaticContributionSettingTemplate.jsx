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

const DonorAutomaticContributionSettingTemplate = function ({ t, donorAutomaticContributionSettingViewStore }) {
    const {
        loaderStore,
        form,
        bankAccountDropdownStore,
        onChangeIsEnabled
    } = donorAutomaticContributionSettingViewStore;

    return (
        <EditFormContent form={form}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
        >
            <h3 className="u-mar--bottom--tny">{t('DONOR.AUTOMATIC_CONTRIBUTION_SETTING.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-lrg-4">
                    <BasicFieldCheckbox field={form.$('isEnabled')} onChange={onChangeIsEnabled} />
                </div>
            </div>
            <div className="row">
                <div className="form__group col col-lrg-4">
                    <BaasicFieldDropdown field={form.$('donorBankAccountId')} store={bankAccountDropdownStore} />
                </div>
                <div className="form__group col col-lrg-4">
                    <NumericInputField field={form.$('amount')} />
                </div>
                <div className="form__group col col-lrg-4">
                    <NumericInputField field={form.$('lowBalanceAmount')} />
                </div>
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} disableSave={!form.$('isEnabled').value} />
        </EditFormContent>
    )
}

DonorAutomaticContributionSettingTemplate.propTypes = {
    donorAutomaticContributionSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAutomaticContributionSettingTemplate);
