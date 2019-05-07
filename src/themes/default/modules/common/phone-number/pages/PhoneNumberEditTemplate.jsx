import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls } from 'core/components';

function PhoneNumberEditTemplate({ phoneNumberEditViewStore, title, children }) {
    const {
        form,
        loading,
    } = phoneNumberEditViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <div className="f-row">
                {title &&
                    <div className="form__group f-col f-col-lrg-12">
                        <h5>{title}</h5>
                    </div>}
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('number')} />
                </div>
                <div className="form__group f-col f-col-lrg-4">
                    <BasicInput field={form.$('description')} />
                </div>

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
