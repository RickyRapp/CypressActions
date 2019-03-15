import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicTextArea, EditFormContent, BaasicFormControls, BaasicButton } from 'core/components';

function DonorNoteEditTemplate({ donorNoteEditViewStore, title, onCancelEdit }) {
    const {
        form,
        loading
    } = donorNoteEditViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <h3>{title}</h3>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicTextArea field={form.$('note')} />
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />

                <BaasicButton
                    className="btn btn--med btn--primary display--ib"
                    label='Cancel'
                    onClick={onCancelEdit}
                />
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(DonorNoteEditTemplate);
