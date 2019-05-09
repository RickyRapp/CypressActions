import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls } from 'core/components';
import { PhoneNumberTemplate } from 'themes/modules/common/phone-number/components';

function DonorAccountPhoneNumberCreateTemplate({ donorAccountPhoneNumberCreateViewStore, title, children }) {
    const {
        form,
        loading
    } = donorAccountPhoneNumberCreateViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <div className="f-row">
                <PhoneNumberTemplate field={form} title={title} />

                {children &&
                    <div className="form__group f-col f-col-lrg-4">
                        {children}
                    </div>}
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    );
}

export default defaultTemplate(DonorAccountPhoneNumberCreateTemplate);
