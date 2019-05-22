import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox, BaasicFieldAsyncDropdown, BasicFieldDatePicker } from 'core/components';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { getFormattedAddress } from 'core/utils'
import _ from 'lodash';

function GrantCreateTemplate({ grantCreateViewStore, t }) {
    const {
        form,
        loaderStore: { loading },
        userId,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantTypeDropdownStore,
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
        recurringAnnualId
    } = grantCreateViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={false} loading={loading}>
                    <PageContentHeader><DonorAccountHeaderDetails userId={userId} type='grant' /></PageContentHeader>
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

                    {grantPurposeTypeDropdownStore &&
                        <React.Fragment>
                            {grantPurposeTypeDropdownStore.value &&
                                (grantPurposeTypeDropdownStore.value.id === inMemoryOfId ||
                                    grantPurposeTypeDropdownStore.value.id === inHonorOfId ||
                                    grantPurposeTypeDropdownStore.value.id === sponsorAFriendId)
                                &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicInput field={form.$('grantPurposeMember.firstName')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicInput field={form.$('grantPurposeMember.lastName')} />
                                    </div>
                                </div>}

                            {grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.id === otherId &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-12">
                                        {t("GRANTCREATEFORM.PURPOSEOTHER")}
                                    </div>
                                    <div className="form__group f-col f-col-lrg-12">
                                        <BasicTextArea field={form.$('additionalInformation')} />
                                    </div>
                                </div>}

                            {grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.id === charityEventId &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-12">
                                        <BasicCheckBox field={form.$('charityEventAttending')} />
                                    </div>
                                    {form.$('charityEventAttending').value === true ?
                                        <div className="form__group f-col f-col-lrg-12">
                                            {t("GRANTCREATEFORM.PURPOSECHARITYEVENTATTENDING")}
                                        </div>
                                        :
                                        <div className="form__group f-col f-col-lrg-12">
                                            {t("GRANTCREATEFORM.PURPOSECHARITYEVENTNOTATTENDING")}
                                        </div>}
                                </div>}

                            {grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.id === membershipId &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-12">
                                        {t("GRANTCREATEFORM.PURPOSEMEMBERSHIP")}
                                    </div>
                                </div>}

                            {grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.id === nonBindingPledgeId &&
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-12">
                                        {t("GRANTCREATEFORM.PURPOSENONBINDINGPLEDGE")}
                                    </div>
                                </div>}
                        </React.Fragment>}}
    
                            <div className="f-row">
                        <div className="form__group f-col f-col-lrg-6">
                            <BasicFormatFieldInput field={form.$('amount')} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} />
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <BasicInput field={form.$('description')} />
                        </div>
                    </div>

                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicCheckBox field={form.$('recurringOrFuture')} />
                        </div>
                    </div>

                    {form.$('recurringOrFuture').value === true &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    <BaasicFieldDropdown field={form.$('grantTypeId')} store={grantTypeDropdownStore} />
                                </div>
                            </div>

                            {grantTypeDropdownStore.value &&
                                <React.Fragment>
                                    {grantTypeDropdownStore.value.id === futureId &&
                                        <div className="f-row">
                                            <div className="form__group f-col f-col-lrg-6">
                                                <BasicFieldDatePicker field={form.$('futureDate')}/>
                                            </div>
                                        </div>
                                    }
                                    {(grantTypeDropdownStore.value.id === recurringMonthlyId || grantTypeDropdownStore.value.id === recurringAnnualId) &&
                                        <div className="f-row">
                                            <div className="form__group f-col f-col-lrg-6">
                                                <BasicFieldDatePicker field={form.$('startDate')}/>
                                            </div>
                                            <div className="form__group f-col f-col-lrg-6">
                                                <BasicFieldDatePicker field={form.$('endDate')}/>
                                            </div>
                                        </div>
                                    }
                                </React.Fragment>
                            }
                        
                        </React.Fragment>}
                </EditFormLayout>}
        </React.Fragment >
    );
};

GrantCreateTemplate.propTypes = {
    grantCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantCreateTemplate);
