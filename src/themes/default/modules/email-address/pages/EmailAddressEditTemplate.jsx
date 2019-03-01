import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls } from 'core/components';

function EmailAddressEditTemplate({ emailAddressEditViewStore, title, children }) {
    const {
        form,
        loading,
    } = emailAddressEditViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <h3>{title}</h3>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('email')} />
                </div>
                <div className="form__group f-col f-col-lrg-4">
                    <BasicInput field={form.$('description')} />
                </div>

                {children &&
                    <div className="form__group f-col f-col-lrg-4">
                        {children}
                    </div>}

                {form.changed &&
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(EmailAddressEditTemplate);
