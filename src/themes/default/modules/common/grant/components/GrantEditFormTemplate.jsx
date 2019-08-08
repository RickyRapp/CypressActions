import React from 'react';
import { BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BaasicFieldAsyncDropdown } from 'core/components';
import { getFormattedAddress, defaultTemplate } from 'core/utils'
import NumberFormat from 'react-number-format';
import { GrantPurposeTypeTemplate } from 'themes/modules/common/grant/components';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip'

function GrantEditFormTemplate({ grantEditViewStore, t }) {
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
    } = grantEditViewStore;

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
                        <BaasicFieldAsyncDropdown field={form.$('donation.charityId')} store={charityDropdownStore} />}
                </div>
            </div>

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
            </div>

            {grantAcknowledgmentTypeDropdownStore &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                    </div>
                    {form.$('grantAcknowledgmentTypeId').value && donorAccount &&
                        <div className="form__group f-col f-col-lrg-6 spc--top--med">
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
                <GrantPurposeTypeTemplate viewStore={grantEditViewStore} />}

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    <BasicTextArea field={form.$('description')} />
                </div>
            </div>

        </React.Fragment >
    )
};


export default defaultTemplate(GrantEditFormTemplate);