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
            <span className='icomoon icon-style-two-pin-information' data-tip data-for={'scheduledGrant'} />
            <ReactTooltip type='info' effect='solid' place="right" id={'scheduledGrant'}>
                <span>{t('GRANTCREATEEDITFORM.SCHEDULENAMETOOLTIP')}</span>
            </ReactTooltip>
        </React.Fragment>

    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    {charityDropdownStore &&
                        <BaasicFieldAsyncDropdown field={form.$('charityId')} store={charityDropdownStore} />}
                </div>
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
                <React.Fragment>
                    {form.$('grantPurposeTypeId').value === inMemoryOfId &&
                        <InMemoryOfEventPurposeType fieldFirstName={form.$('grantPurposeMember.firstName')} fieldLastName={form.$('grantPurposeMember.lastName')} t={t} />}

                    {form.$('grantPurposeTypeId').value === inHonorOfId &&
                        <InHonorOfEventPurposeType fieldFirstName={form.$('grantPurposeMember.firstName')} fieldLastName={form.$('grantPurposeMember.lastName')} t={t} />}

                    {form.$('grantPurposeTypeId').value === sponsorAFriendId &&
                        <SponsorAFriendPurposeType fieldFirstName={form.$('grantPurposeMember.firstName')} fieldLastName={form.$('grantPurposeMember.lastName')} t={t} />}

                    {form.$('grantPurposeTypeId').value === otherId &&
                        <OtherPurposeType field={form.$('additionalInformation')} t={t} />}

                    {form.$('grantPurposeTypeId').value === charityEventId &&
                        <CharityEventPurposeType field={form.$('charityEventAttending')} t={t} />}

                    {form.$('grantPurposeTypeId').value === membershipId &&
                        <MembershipPurposeType t={t} />}

                    {form.$('grantPurposeTypeId').value === nonBindingPledgeId &&
                        <NonBindingPledgePurposeType t={t} />}
                </React.Fragment>}

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicFormatFieldInput field={form.$('amount')} decimalScale={2} onBlur={calculateFee} thousandSeparator={true} prefix={'$'} />
                </div>
                {(form.$('grantScheduleTypeId').value === oneTimeId &&
                    (form.$('startFutureDate').value ? form.$('startFutureDate').value.toLocaleDateString() : null) === (new Date()).toLocaleDateString()) &&
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label>Total Amount</label>
                            <NumberFormat
                                className={"input input--text input--med padd--top--tny input--disabled"}
                                value={totalAmount} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} displayType={'text'}
                            />
                        </div>
                    </div>}
                <div className="form__group f-col f-col-lrg-12">
                    <BasicTextArea field={form.$('description')} />
                </div>
            </div>


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
                            {(form.$('grantScheduleTypeId').value === monthlyId || form.$('grantScheduleTypeId').value === annualId) &&
                                <div className="form__group f-col f-col-lrg-12">
                                    <div className="f-row">
                                        {(form.$('grantScheduleTypeId').value === monthlyId || form.$('grantScheduleTypeId').value === annualId) &&
                                            <div className="form__group f-col f-col-lrg-6">
                                                <BasicInput field={form.$('name')} tooltip={scheduleGrantTooltip} />
                                            </div>}
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
                                        </div>
                                    </div>
                                </div>}
                        </React.Fragment>}
                </div>
            </React.Fragment>
        </React.Fragment >
    )
};


export default defaultTemplate(GrantCreateFormTemplate);