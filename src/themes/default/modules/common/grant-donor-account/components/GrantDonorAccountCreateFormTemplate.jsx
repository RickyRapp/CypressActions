import React from 'react';
import { BasicInput, BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox, BaasicFieldAsyncDropdown, BasicFieldDatePicker } from 'core/components';
import { getFormattedAddress, defaultTemplate } from 'core/utils'
import NumberFormat from 'react-number-format';
import { GrantDonorAccountPurposeTypeTemplate, GrantScheduledPaymentCreateFormTemplate } from 'themes/modules/common/grant-donor-account/components';
import _ from 'lodash';

function GrantDonorAccountCreateFormTemplate({ grantDonorAccountCreateViewStore, t }) {
    const {
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        charityDropdownStore,
        fundNameAndAddressId,
        fundNameId,
        donorAccount,
        oneTimeId,
        isFutureGrant,
        totalAmount,
        onChangeAmount
    } = grantDonorAccountCreateViewStore;

    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    {charityDropdownStore &&
                        <BaasicFieldAsyncDropdown field={form.$('grant.charityId')} store={charityDropdownStore} />}
                </div>
            </div>

            {form.$('grant.charityId').value &&
                <React.Fragment>
                    <GrantScheduledPaymentCreateFormTemplate createViewStore={grantDonorAccountCreateViewStore} />

                    {form.$('startFutureDate').value && (!isFutureGrant || isFutureGrant && (form.$('endDate').value || form.$('numberOfPayments').value || form.$('noEndDate').value)) &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicFormatFieldInput field={form.$('amount')} decimalScale={2} onBlur={onChangeAmount} thousandSeparator={true} prefix={'$'} />
                                </div>
                                {(form.$('grantScheduleTypeId').value === oneTimeId &&
                                    (form.$('startFutureDate').value ? form.$('startFutureDate').value.toLocaleDateString() : null) === (new Date()).toLocaleDateString()) &&
                                    <div className="form__group f-col f-col-lrg-6">
                                        <div className="inputgroup">
                                            <label>Total Amount With Fee</label>
                                            <NumberFormat
                                                className={"input input--text input--med padd--top--tny input--disabled"}
                                                value={totalAmount} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} displayType={'text'}
                                            />
                                        </div>
                                    </div>}
                            </div>

                            {grantAcknowledgmentTypeDropdownStore &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-6">
                                        <BaasicFieldDropdown field={form.$('grant.grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                                    </div>
                                    {form.$('grant.grantAcknowledgmentTypeId').value &&
                                        <div className="form__group f-col f-col-lrg-6 spc--top--sml">
                                            {form.$('grant.grantAcknowledgmentTypeId').value === fundNameAndAddressId && `${donorAccount.fundName} - ${getFormattedAddress(_.find(donorAccount.donorAccountAddresses, { primary: true }).address)}`}
                                            {form.$('grant.grantAcknowledgmentTypeId').value === fundNameId && donorAccount.fundName}
                                        </div>}
                                </div>}

                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    {grantPurposeTypeDropdownStore &&
                                        <BaasicFieldDropdown field={form.$('grant.grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />}
                                </div>
                            </div>

                            {form.$('grant.grantPurposeTypeId').value &&
                                <GrantDonorAccountPurposeTypeTemplate viewStore={grantDonorAccountCreateViewStore} />}

                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-12">
                                    <BasicTextArea field={form.$('grant.description')} />
                                </div>
                            </div>
                        </React.Fragment>}
                </React.Fragment>}
        </React.Fragment>
    )
};

export default defaultTemplate(GrantDonorAccountCreateFormTemplate);