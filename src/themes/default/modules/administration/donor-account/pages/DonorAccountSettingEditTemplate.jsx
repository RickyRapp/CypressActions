import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls } from 'core/components';
import { DonorAccountSettingsTemplate } from 'themes/modules/administration/donor-account/components';

function DonorAccountSettingEditTemplate({ donorAccountSettingEditViewStore, premiumId }) {
    const { form, loading, deliveryMethodTypeDropdownStore } = donorAccountSettingEditViewStore;

    return (
        <EditFormContent form={form} isEdit={true} loading={loading}>
            <DonorAccountSettingsTemplate
                form={form}
                title='Account Settings'
                deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
                premiumId={premiumId}
                columns={4} />

            <div className="form__group f-col f-col-lrg-12">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent >
    );
}

export default defaultTemplate(DonorAccountSettingEditTemplate);
