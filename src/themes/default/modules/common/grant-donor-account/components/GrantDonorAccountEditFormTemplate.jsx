import React from 'react';
import { BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BaasicFieldAsyncDropdown } from 'core/components';
import { getFormattedAddress, defaultTemplate } from 'core/utils'
import NumberFormat from 'react-number-format';
import { GrantDonorAccountPurposeTypeTemplate } from 'themes/modules/common/grant-donor-account/components';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip'

function GrantDonorAccountEditFormTemplate({ grantDonorAccountEditViewStore, t }) {
    const {
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        charityDropdownStore,
        fundNameAndAddressId,
        fundNameId,
        donorAccount,
        totalAmount,
        calculateFee
    } = grantDonorAccountEditViewStore;

    const amountChange =
        <React.Fragment>
            <span className='icomoon icon-alert-circle' data-tip data-for={'amountChange'} />
            <ReactTooltip type='info' effect='solid' place="right" id={'amountChange'}>
                <span>{t('GRANTUPDATEFORM.AMOUNTCHANGE')}</span>
            </ReactTooltip>
        </React.Fragment>

    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    {charityDropdownStore &&
                        <BaasicFieldAsyncDropdown field={form.$('grant.charityId')} store={charityDropdownStore} />}
                </div>
            </div>

            {grantAcknowledgmentTypeDropdownStore &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <BaasicFieldDropdown field={form.$('grant.grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                    </div>
                    {form.$('grant.grantAcknowledgmentTypeId').value && donorAccount &&
                        <div className="form__group f-col f-col-lrg-6 spc--top--med">
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
                <GrantDonorAccountPurposeTypeTemplate viewStore={grantDonorAccountEditViewStore} />}

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicFormatFieldInput field={form.$('amount')} decimalScale={2} onBlur={calculateFee} thousandSeparator={true} prefix={'$'} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <div className="inputgroup">
                        <label>Total Amount With Fee</label>{Number(form.$('amount').value) !== Number(form.$('amount').get('default')) && amountChange}
                        <NumberFormat
                            className={"input input--text input--med padd--top--tny input--disabled"}
                            value={totalAmount} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} displayType={'text'}
                        />
                    </div>
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <BasicTextArea field={form.$('grant.description')} />
                </div>
            </div>
        </React.Fragment >
    )
};


export default defaultTemplate(GrantDonorAccountEditFormTemplate);