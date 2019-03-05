import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicTextArea, EditFormContent, BaasicFormControls } from 'core/components';

function DonorNoteCreateTemplate({ donorNoteCreateViewStore, title }) {
    const {
        form,
        loading,
    } = donorNoteCreateViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <h3>{title}</h3>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicTextArea field={form.$('note')} />
                </div>

                {form.changed &&
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(DonorNoteCreateTemplate);
