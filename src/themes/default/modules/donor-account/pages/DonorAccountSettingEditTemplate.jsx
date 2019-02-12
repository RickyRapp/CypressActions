import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicCheckBox, EditFormContent, BaasicFormControls, BaasicButton } from 'core/components';

function DonorAccountSettingEditTemplate({ settingEditViewStore }) {
    const { form, loading, rootStore, onChangeInitialContribution } = settingEditViewStore;

    return (
        <EditFormContent form={form} isEdit={true} loading={loading}>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('lineOfCredit')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicCheckBox field={form.$('initialContribution')} onChange={onChangeInitialContribution} />
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
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            <BaasicButton
                className="btn btn--med btn--primary display--ib"
                label={'Cancel'}
                onClick={() => rootStore.routerStore.goBack()}
            />
        </EditFormContent >
    );
}

export default defaultTemplate(DonorAccountSettingEditTemplate);
