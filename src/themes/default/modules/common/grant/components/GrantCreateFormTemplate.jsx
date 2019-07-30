import React from 'react';
import { BasicInput, BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox, BaasicFieldAsyncDropdown, BasicFieldDatePicker } from 'core/components';
import { getFormattedAddress, defaultTemplate } from 'core/utils'
import NumberFormat from 'react-number-format';
import {
    OtherPurposeType, CharityEventPurposeType, InMemoryOfEventPurposeType, InHonorOfEventPurposeType,
    SponsorAFriendPurposeType, NonBindingPledgePurposeType, MembershipPurposeType
} from 'themes/modules/common/grant/components';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

function GrantCreateFormTemplate({ grantCreateViewStore, t }) {
    const {
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantScheduleTypeDropdownStore,
        charityDropdownStore,
        inMemoryOfId,
        inHonorOfId,
        sponsorAFriendId,
        otherId,
        charityEventId,
        membershipId,
        nonBindingPledgeId,
        fundNameAndAddressId,
        fundNameId,
        donorAccount,
        oneTimeId,
        monthlyId,
        annualId,
        isFutureGrant,
        totalAmount,
        calculateFee,
        onStartFutureDateChange
    } = grantCreateViewStore;

    const scheduleGrantTooltip =
        <React.Fragment>
            <span className='icomoon icon-question-circle' data-tip data-for={'scheduledGrant'} />
            <ReactTooltip type='info' effect='solid' place="right" id={'scheduledGrant'}>
                <span>{t('GRANTCREATEEDITFORM.SCHEDULENAMETOOLTIP')}</span>
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

            {form.$('grant.charityId').value &&
                <React.Fragment>
                    <div className="f-row">
                        {grantScheduleTypeDropdownStore &&
                            <div className="form__group f-col f-col-lrg-6">
                                <BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} />
                            </div>}

                        {form.$('grantScheduleTypeId').value &&
                            <React.Fragment>
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicFieldDatePicker
                                        field={form.$('startFutureDate')}
                                        before={new Date()}
                                        after={form.$('endDate').value !== '' ? form.$('endDate').value : null}
                                        todayButton={t('TODAY')}
                                        onChange={onStartFutureDateChange}
                                    />
                                </div>
                                {(form.$('grantScheduleTypeId').value === monthlyId || form.$('grantScheduleTypeId').value === annualId || isFutureGrant) &&
                                    <div className="form__group f-col f-col-lrg-12">
                                        <div className="f-row">
                                            <div className="form__group f-col f-col-lrg-6">
                                                <BasicInput field={form.$('name')} tooltip={scheduleGrantTooltip} />
                                            </div>
                                            {(form.$('grantScheduleTypeId').value === monthlyId || form.$('grantScheduleTypeId').value === annualId) &&
                                                <div className="form__group f-col f-col-lrg-12">
                                                    <div className="f-row">
                                                        {!(form.$('noEndDate').value && form.$('noEndDate').value === true) && !(form.$('numberOfPayments').value && form.$('numberOfPayments').value !== '') &&
                                                            <div className="form__group f-col f-col-lrg-4">
                                                                <BasicFieldDatePicker field={form.$('endDate')} isClearable={true} before={form.$('startFutureDate').value !== '' ? form.$('startFutureDate').value : new Date()} />
                                                            </div>}

                                                        {!(form.$('endDate').value && form.$('endDate').value !== '') && !(form.$('numberOfPayments').value && form.$('numberOfPayments').value !== '') &&
                                                            <div className="form__group f-col f-col-lrg-4">
                                                                <BasicCheckBox field={form.$('noEndDate')} />
                                                            </div>}

                                                        {!(form.$('noEndDate').value && form.$('noEndDate').value === true) && !(form.$('endDate').value && form.$('endDate').value !== '') &&
                                                            <div className="form__group f-col f-col-lrg-4">
                                                                <BasicInput field={form.$('numberOfPayments')} />
                                                            </div>}
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>}
                            </React.Fragment>}
                    </div>

                    {form.$('startFutureDate').value && (!isFutureGrant || isFutureGrant && (form.$('endDate').value || form.$('numberOfPayments').value || form.$('noEndDate').value)) &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicFormatFieldInput field={form.$('amount')} decimalScale={2} onBlur={calculateFee} thousandSeparator={true} prefix={'$'} />
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

                                {form.$('grantPurposeTypeId').value === inMemoryOfId &&
                                    <div className="form__group f-col f-col-lrg-6">
                                        <InMemoryOfEventPurposeType fieldName={form.$('grantPurposeMemberName')} t={t} />
                                    </div>}

                                {form.$('grantPurposeTypeId').value === inHonorOfId &&
                                    <div className="form__group f-col f-col-lrg-6">
                                        <InHonorOfEventPurposeType fieldName={form.$('grantPurposeMemberName')} t={t} />
                                    </div>}

                                {form.$('grantPurposeTypeId').value === sponsorAFriendId &&
                                    <div className="form__group f-col f-col-lrg-6">
                                        <SponsorAFriendPurposeType fieldName={form.$('grantPurposeMemberName')} t={t} />
                                    </div>}

                                {form.$('grantPurposeTypeId').value === otherId &&
                                    <div className="form__group f-col f-col-lrg-12">
                                        <OtherPurposeType field={form.$('additionalInformation')} t={t} />
                                    </div>}

                                {form.$('grantPurposeTypeId').value === charityEventId &&
                                    <div className="form__group f-col f-col-lrg-12">
                                        <CharityEventPurposeType field={form.$('charityEventAttending')} t={t} />
                                    </div>}

                                {form.$('grantPurposeTypeId').value === membershipId &&
                                    <div className="form__group f-col f-col-lrg-6 spc--top--sml">
                                        <MembershipPurposeType t={t} />
                                    </div>}

                                {form.$('grantPurposeTypeId').value === nonBindingPledgeId &&
                                    <div className="form__group f-col f-col-lrg-12">
                                        <NonBindingPledgePurposeType t={t} />
                                    </div>}
                            </div>

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