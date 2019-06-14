import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicTextArea, BaasicButton, EditFormContent, BaasicFormControls } from 'core/components';

function DonorNoteCreateEditTemplate({ donorNoteCreateEditViewStore, title, t }) {
    const {
        form,
        loading,
        isEdit,
        onCancelEdit
    } = donorNoteCreateEditViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <h3>{title}</h3>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-8">
                    <BasicTextArea field={form.$('note')} />
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                {isEdit &&
                    <BaasicButton
                        className="btn btn--med btn--primary spc--sml display--ib"
                        label={t('CANCEL')}
                        onClick={onCancelEdit}
                    />}
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(DonorNoteCreateEditTemplate);
