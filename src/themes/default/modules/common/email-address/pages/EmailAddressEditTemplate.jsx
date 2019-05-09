import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls } from 'core/components';
import { EmailAddressTemplate } from 'themes/modules/common/email-address/components';

function EmailAddressEditTemplate({ emailAddressEditViewStore, title, children }) {
    const {
        form,
        loading,
    } = emailAddressEditViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <div className="f-row">
                <EmailAddressTemplate field={form} title={title} />

                {children &&
                    <div className="form__group f-col f-col-lrg-4">
                        {children}
                    </div>}
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    );
}

export default defaultTemplate(EmailAddressEditTemplate);
