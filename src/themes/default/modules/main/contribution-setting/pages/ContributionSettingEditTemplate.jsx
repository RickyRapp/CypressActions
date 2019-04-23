import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls, BaasicFieldDropdown, BasicCheckBox, BasicFieldDatePicker } from 'core/components';
import _ from 'lodash';

function ContributionSettingEditTemplate({ contributionSettingEditViewStore, title }) {
    const {
        form,
        loading,
        bankAccountDropdownStore,
        contributionSettingType
    } = contributionSettingEditViewStore;

    const styles = {
        opacity: '0.5',
        pointerEvents: 'none'
    }

    return (
        <EditFormContent form={form} loading={loading}>
            <h3>{form.$('contributionSettingTypeId').value && _.find(contributionSettingType, { id: form.$('contributionSettingTypeId').value }).name}</h3>
            <BasicCheckBox field={form.$('enabled')} />
            <div className="f-row" style={form.$('enabled').value ? null : styles}>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('amount')} />
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    {bankAccountDropdownStore &&
                        <BaasicFieldDropdown field={form.$('bankAccountId')} store={bankAccountDropdownStore} />}
                </div>
                {_.find(contributionSettingType, { abrv: 'low-balance' }).id == form.$('contributionSettingTypeId').value ?
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicInput field={form.$('lowBalanceAmount')} />
                    </div>
                    :
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicFieldDatePicker field={form.$('startDate')} />
                    </div>}
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    );
}

export default defaultTemplate(ContributionSettingEditTemplate);
