import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicFormatFieldInput, BasicInput, EditFormContent, BaasicFormControls } from 'core/components';

function SessionInfoTemplate({ sessionInfoViewStore }) {
    const {
        form,
        loadExistingSession,
        loadingExistingSession
    } = sessionInfoViewStore;

    return (
        <EditFormContent form={form}>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('fullName')} />
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('phoneNumber')} />
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('email')} />
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('charityName')} />
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicFormatFieldInput field={form.$('taxId')} format="##-#######" mask="*" />
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('charityEmail')} />
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('description')} />
                </div>
            </div>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-8">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
                <div className="form__group f-col f-col-lrg-4">
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <span>
                                <span className={loadingExistingSession
                                    ? 'icomoon icon-synchronize-arrows-1 rotate'
                                    : ''
                                }></span>
                            </span>
                        </div>
                        <div className="form__group f-col f-col-lrg-9">
                            <input className="input input--med input--text" onChange={loadExistingSession} />
                        </div>
                    </div>
                </div>
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(SessionInfoTemplate);
