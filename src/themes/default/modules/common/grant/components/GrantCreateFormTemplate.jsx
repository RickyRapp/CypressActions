import React from 'react';
import { BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox, BaasicFieldAsyncDropdown, BasicFieldDatePicker } from 'core/components';
import { getFormattedAddress, defaultTemplate } from 'core/utils'
import NumberFormat from 'react-number-format';
import {
    OtherPurposeType, CharityEventPurposeType, InMemoryOfEventPurposeType, InHonorOfEventPurposeType,
    SponsorAFriendPurposeType, NonBindingPledgePurposeType, MembershipPurposeType
} from 'themes/modules/common/grant/components';
import _ from 'lodash';

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
        futureId,
        recurringMonthlyId,
        recurringAnnualId,
        totalAmount,
        calculateFee
    } = grantCreateViewStore;

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
                    {grantAcknowledgmentTypeDropdownStore.value &&
                        <div className="form__group f-col f-col-lrg-6 spc--top--med">
                            {grantAcknowledgmentTypeDropdownStore.value.id === fundNameAndAddressId && `${donorAccount.fundName} - ${getFormattedAddress(_.find(donorAccount.donorAccountAddresses, { primary: true }).address)}`}
                            {grantAcknowledgmentTypeDropdownStore.value.id === fundNameId && donorAccount.fundName}
                        </div>}
                </div>}

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    {grantPurposeTypeDropdownStore &&
                        <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />}
                </div>
            </div>

            {grantPurposeTypeDropdownStore && grantPurposeTypeDropdownStore.value &&
                <React.Fragment>
                    {grantPurposeTypeDropdownStore.value.id === inMemoryOfId &&
                        <InMemoryOfEventPurposeType fieldFirstName={form.$('grantPurposeMember.firstName')} fieldLastName={form.$('grantPurposeMember.lastName')} t={t} />}

                    {grantPurposeTypeDropdownStore.value.id === inHonorOfId &&
                        <InHonorOfEventPurposeType fieldFirstName={form.$('grantPurposeMember.firstName')} fieldLastName={form.$('grantPurposeMember.lastName')} t={t} />}

                    {grantPurposeTypeDropdownStore.value.id === sponsorAFriendId &&
                        <SponsorAFriendPurposeType fieldFirstName={form.$('grantPurposeMember.firstName')} fieldLastName={form.$('grantPurposeMember.lastName')} t={t} />}

                    {grantPurposeTypeDropdownStore.value.id === otherId &&
                        <OtherPurposeType field={form.$('additionalInformation')} t={t} />}

                    {grantPurposeTypeDropdownStore.value.id === charityEventId &&
                        <CharityEventPurposeType field={form.$('charityEventAttending')} t={t} />}

                    {grantPurposeTypeDropdownStore.value.id === membershipId &&
                        <MembershipPurposeType t={t} />}

                    {grantPurposeTypeDropdownStore.value.id === nonBindingPledgeId &&
                        <NonBindingPledgePurposeType t={t} />}
                </React.Fragment>}

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicFormatFieldInput field={form.$('amount')} decimalScale={2} onBlur={calculateFee} thousandSeparator={true} prefix={'$'} />
                </div>
                {(!form.$('recurringOrFuture').value || form.$('recurringOrFuture').value === false) &&
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

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-4">
                    <BasicCheckBox field={form.$('recurringOrFuture')} />
                </div>
            </div>

            {
                form.$('recurringOrFuture').value === true &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-6">
                            <BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} />
                        </div>
                    </div>

                    {grantScheduleTypeDropdownStore.value &&
                        <React.Fragment>
                            {grantScheduleTypeDropdownStore.value.id === futureId &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicFieldDatePicker field={form.$('futureDate')} />
                                    </div>
                                </div>}

                            {(grantScheduleTypeDropdownStore.value.id === recurringMonthlyId || grantScheduleTypeDropdownStore.value.id === recurringAnnualId) &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicFieldDatePicker field={form.$('startDate')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicFieldDatePicker field={form.$('endDate')} />
                                    </div>
                                </div>}
                        </React.Fragment>}
                </React.Fragment>
            }
        </React.Fragment >
    )
};

export default defaultTemplate(GrantCreateFormTemplate);