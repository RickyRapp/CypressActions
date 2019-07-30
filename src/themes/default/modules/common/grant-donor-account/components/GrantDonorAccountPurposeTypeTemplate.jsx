import React from 'react';
import { defaultTemplate } from 'core/utils'
import { BasicInput, BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox, BaasicFieldAsyncDropdown, BasicFieldDatePicker } from 'core/components';
import _ from 'lodash';

function GrantDonorAccountPurposeTypeTemplate(
    {
        viewStore: {
            inMemoryOfId,
            inHonorOfId,
            sponsorAFriendId,
            otherId,
            charityEventId,
            membershipId,
            nonBindingPledgeId,
            form },
        t }
) {

    return (
        <React.Fragment>
            {form.$('grant.grantPurposeTypeId').value === inMemoryOfId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicInput field={form.$('grant.grantPurposeMemberName')} />
                    </div>
                </div>}

            {form.$('grant.grantPurposeTypeId').value === inHonorOfId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicInput field={form.$('grant.grantPurposeMemberName')} />
                    </div>
                </div>}

            {form.$('grant.grantPurposeTypeId').value === sponsorAFriendId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicInput field={form.$('grant.grantPurposeMemberName')} />
                    </div>
                </div>}

            {form.$('grant.grantPurposeTypeId').value === otherId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        {t("GRANTCREATEEDITFORM.PURPOSEOTHER")}
                    </div>
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicTextArea field={form.$('grant.additionalInformation')} />
                    </div>
                </div>
            }

            {form.$('grant.grantPurposeTypeId').value === charityEventId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicCheckBox field={form.$('grant.charityEventAttending')} />
                    </div>
                    {form.$('grant.charityEventAttending').value === true ?
                        <div className="form__group f-col f-col-lrg-12">
                            {t("GRANTCREATEEDITFORM.PURPOSECHARITYEVENTATTENDING")}
                        </div>
                        :
                        <div className="form__group f-col f-col-lrg-12">
                            {t("GRANTCREATEEDITFORM.PURPOSECHARITYEVENTNOTATTENDING")}
                        </div>}
                </div>}

            {form.$('grant.grantPurposeTypeId').value === membershipId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        {t("GRANTCREATEEDITFORM.PURPOSEMEMBERSHIP")}
                    </div>
                </div>}

            {form.$('grant.grantPurposeTypeId').value === nonBindingPledgeId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        {t("GRANTCREATEEDITFORM.PURPOSENONBINDINGPLEDGE")}
                    </div>
                </div>}
        </React.Fragment>
    )
};


export default defaultTemplate(GrantDonorAccountPurposeTypeTemplate);