import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls } from 'core/components';
import { DonorAccountSettingsAdministrationEdit } from 'themes/modules/donor-account/components';

function DonorAccountSettingAdministrationEditTemplate({ donorAccountSettingAdministrationEditViewStore }) {
    const { form, loading } = donorAccountSettingAdministrationEditViewStore;

    return (
        <EditFormContent form={form} isEdit={true} loading={loading}>
            <h3>Account Settings</h3>

            <DonorAccountSettingsAdministrationEdit form={form} />

            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent >
    );
}

export default defaultTemplate(DonorAccountSettingAdministrationEditTemplate);
