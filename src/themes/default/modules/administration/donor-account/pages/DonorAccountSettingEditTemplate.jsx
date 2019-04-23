import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls } from 'core/components';
import { DonorAccountSettingsEdit } from 'themes/modules/administration/donor-account/components';

function DonorAccountSettingEditTemplate({ donorAccountSettingEditViewStore, columns }) {
    const { form, loading, deliveryMethodTypeDropdownStore } = donorAccountSettingEditViewStore;

    return (
        <EditFormContent form={form} isEdit={true} loading={loading}>
            <h3>Account Settings</h3>

            <DonorAccountSettingsEdit form={form} columns={columns} deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore} />

            <div className="form__group f-col f-col-lrg-12">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent >
    );
}

export default defaultTemplate(DonorAccountSettingEditTemplate);
