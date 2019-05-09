import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls } from 'core/components';
import { PhoneNumberTemplate } from 'themes/modules/common/phone-number/components';

function PhoneNumberEditTemplate({ phoneNumberEditViewStore, title, children }) {
    const {
        form,
        loading,
    } = phoneNumberEditViewStore;

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

export default defaultTemplate(PhoneNumberEditTemplate);
