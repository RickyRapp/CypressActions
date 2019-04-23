import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls } from 'core/components';
import { ContributionSettingCreateFormFieldsTemplate } from 'themes/modules/main/contribution-setting/components';
import _ from 'lodash';

function ContributionSettingCreateTemplate({ contributionSettingCreateViewStore }) {
    const {
        form,
        loading,
        bankAccountDropdownStore,
        contributionSettingTypeDropdownStore
    } = contributionSettingCreateViewStore;


    return (
        <EditFormContent form={form} loading={loading}>
            <ContributionSettingCreateFormFieldsTemplate
                enabledField={form.$('enabled')}
                amountField={form.$('amount')}
                bankAccountIdField={form.$('bankAccountId')}
                contributionSettingTypeIdField={form.$('contributionSettingTypeId')}
                lowBalanceAmountField={form.$('lowBalanceAmount')}
                startDateField={form.$('startDate')}
                bankAccountDropdownStore={bankAccountDropdownStore}
                contributionSettingTypeDropdownStore={contributionSettingTypeDropdownStore} />

            {form.$('contributionSettingTypeId').value &&
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
        </EditFormContent>
    );
}

export default defaultTemplate(ContributionSettingCreateTemplate);
