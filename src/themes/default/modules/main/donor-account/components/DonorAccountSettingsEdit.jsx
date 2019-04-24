import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicCheckBox, BasicFormatFieldInput, BaasicFieldDropdown } from 'core/components';

function DonorAccountSettingsEdit({ form, deliveryMethodTypeDropdownStore, columns = 3 }) {
    return (
        <React.Fragment>
            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('lineOfCredit')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicCheckBox field={form.$('initialContribution')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('contributionMinimumInitial')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('contributionMinimumAdditional')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('grantMinimumAmount')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('grantFee')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('certificateDeduction')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('certificateFee')} />
            </div>

            <div className={"form__group f-col f-col-lrg-" + columns}>
                <BasicInput field={form.$('extraBookletPercentage')} />
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
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountSettingsEdit);
