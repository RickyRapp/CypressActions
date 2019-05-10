import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicFormatFakeInput, BasicCheckBox, BasicFormatFieldInput, BaasicFieldDropdown } from 'core/components';

function DonorAccountSettingsTemplate({ form, title = null, deliveryMethodTypeDropdownStore, premiumId, columns = 3 }) {
    return (
        <React.Fragment>
            {title &&
                <div className="form__group f-col f-col-lrg-12">
                    <h5>{title}</h5>
                </div>}

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                {/* need checkbox fake input */}
                <BasicCheckBox field={form.$('initialContribution')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                <BasicFormatFakeInput thousandSeparator={true} prefix={'$'} field={form.$('lineOfCredit')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                <BasicFormatFakeInput thousandSeparator={true} prefix={'$'} field={form.$('contributionMinimumInitial')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                <BasicFormatFakeInput thousandSeparator={true} prefix={'$'} field={form.$('contributionMinimumAdditional')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                <BasicFormatFakeInput thousandSeparator={true} prefix={'$'} field={form.$('grantMinimumAmount')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                <BasicFormatFakeInput suffix={'%'} field={form.$('grantFee')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                <BasicFormatFakeInput suffix={'%'} field={form.$('certificateDeduction')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                <BasicFormatFakeInput suffix={'%'} field={form.$('certificateFee')} />
            </div>

            <div className={`form__group f-col f-col-lrg-${columns}`}>
                {deliveryMethodTypeDropdownStore &&
                    <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />}
            </div>

            {form.has('accountTypeId') && form.$('accountTypeId').value === premiumId &&
                <React.Fragment>
                    <div className={`form__group f-col f-col-lrg-${columns}`}>
                        <BasicFormatFieldInput suffix={'%'} field={form.$('extraBookletPercentage')} />
                    </div>

                    <div className={`form__group f-col f-col-lrg-${columns}`}>
                        <BasicFormatFieldInput thousandSeparator={true} prefix={'$'} field={form.$('blankBookletMax')} />
                    </div>

                    <div className={`form__group f-col f-col-lrg-${columns}`}>
                        <BasicFormatFieldInput thousandSeparator={true} prefix={'$'} field={form.$('notificationLimitRemainderAmount')} />
                    </div>
                </React.Fragment>}
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountSettingsTemplate);
