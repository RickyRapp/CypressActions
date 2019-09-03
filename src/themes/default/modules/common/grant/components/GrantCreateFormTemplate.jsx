import React from 'react';
import { BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BaasicFieldAsyncDropdown } from 'core/components';
import { getFormattedAddress, defaultTemplate } from 'core/utils'
import NumberFormat from 'react-number-format';
import { GrantPurposeTypeTemplate, GrantScheduledPaymentCreateFormTemplate } from 'themes/modules/common/grant/components';
import _ from 'lodash';

function GrantCreateFormTemplate({ grantCreateViewStore, t }) {
    const {
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        charityDropdownStore,
        fundNameAndAddressId,
        fundNameId,
        donorAccount,
        isOneTimeGrant,
        isFutureGrant,
        isMonthlyGrant,
        isAnnualGrant,
        totalAmount,
        onChangeAmount
    } = grantCreateViewStore;

    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    {charityDropdownStore &&
                        <BaasicFieldAsyncDropdown field={form.$('donation.charityId')} store={charityDropdownStore} />}
                </div>
            </div>

            {form.$('donation.charityId').value &&
                <React.Fragment>
                    <GrantScheduledPaymentCreateFormTemplate createViewStore={grantCreateViewStore} />

                    {(isOneTimeGrant || isFutureGrant || isMonthlyGrant || isAnnualGrant) &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicFormatFieldInput field={form.$('amount')} decimalScale={2} onBlur={onChangeAmount} thousandSeparator={true} prefix={'$'} />
                                </div>
                                {isOneTimeGrant &&
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
                                        <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                                    </div>
                                    {form.$('grantAcknowledgmentTypeId').value &&
                                        <div className="form__group f-col f-col-lrg-6 spc--top--sml">
                                            {form.$('grantAcknowledgmentTypeId').value === fundNameAndAddressId && `${donorAccount.fundName} - ${getFormattedAddress(_.find(donorAccount.donorAccountAddresses, { primary: true }).address)}`}
                                            {form.$('grantAcknowledgmentTypeId').value === fundNameId && donorAccount.fundName}
                                        </div>}
                                </div>}

                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    {grantPurposeTypeDropdownStore &&
                                        <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />}
                                </div>
                            </div>

                            {form.$('grantPurposeTypeId').value &&
                                <GrantPurposeTypeTemplate viewStore={grantCreateViewStore} />}

                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-12">
                                    <BasicTextArea field={form.$('description')} />
                                </div>
                            </div>
                        </React.Fragment>}
                </React.Fragment>}
        </React.Fragment>
    )
};

export default defaultTemplate(GrantCreateFormTemplate);