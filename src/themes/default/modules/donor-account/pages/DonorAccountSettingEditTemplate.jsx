import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicCheckBox, EditFormContent, BaasicFormControls } from 'core/components';

function DonorAccountSettingEditTemplate({ settingEditViewStore }) {
    const { form, loading } = settingEditViewStore;

    return (
        <EditFormContent form={form} isEdit={true} loading={loading}>
            <h3>Account Settings</h3>

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('lineOfCredit')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicCheckBox field={form.$('initialContribution')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('contributionMinimumInitial')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('contributionMinimumAdditional')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('grantMinimumAmount')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('grantFee')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('certificateDeduction')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('certificateFee')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('extraBookletPercentage')} />
                </div>
            </div>

            {form.changed &&
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
        </EditFormContent >
    );
}

export default defaultTemplate(DonorAccountSettingEditTemplate);
