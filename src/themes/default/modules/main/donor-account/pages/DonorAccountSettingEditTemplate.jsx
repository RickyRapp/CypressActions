import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls, BasicInput, BasicFormatFieldInput, BaasicFieldDropdown } from 'core/components';

function DonorAccountSettingEditTemplate({ donorAccountSettingEditViewStore, columns }) {
    const { item, form, loading, deliveryMethodTypeDropdownStore } = donorAccountSettingEditViewStore;

    return (
        <EditFormContent form={form} isEdit={true} loading={loading}>
            <h3>Account Settings</h3>

            {item &&
                <React.Fragment>
                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Line Of Credit {item.lineOfCredit}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Initial Contribution - {item.initialContribution ? 'Yes' : 'No'}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Contribution Minimum Initial {item.contributionMinimumInitial}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Contribution Minimum Additional {item.contributionMinimumAdditional}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Grant Minimum Amount {item.grantMinimumAmount}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Grant Fee{item.grantFee}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        certificate Deduction {item.certificateDeduction}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Certificate Fee{item.certificateFee}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        Extra Booklet Percentage {item.extraBookletPercentage}
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        <BasicInput field={form.$('blankBookletMax')} />
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        <BasicInput field={form.$('notificationLimitRemainderAmount')} />
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        <BasicFormatFieldInput field={form.$('securityPin')} format="####" mask="*" />
                    </div>

                    <div className={"form__group f-col f-col-lrg-" + columns}>
                        {deliveryMethodTypeDropdownStore &&
                            <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />}
                    </div>
                </React.Fragment>}

            <div className="form__group f-col f-col-lrg-12">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent >
    );
}

export default defaultTemplate(DonorAccountSettingEditTemplate);
