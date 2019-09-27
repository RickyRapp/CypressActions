import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicFormatFieldInput, EditFormContent, BaasicFormControls } from 'core/components';

function ScannerConfigTemplate({ scannerConfigViewStore, t }) {
    const {
        form
    } = scannerConfigViewStore;

    return (
        <EditFormContent form={form}>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicFormatFieldInput field={form.$('code')} format="####" mask="*" />
                </div>
            </div>
            <div>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(ScannerConfigTemplate);
