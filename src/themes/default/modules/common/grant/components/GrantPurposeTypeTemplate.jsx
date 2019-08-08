import React from 'react';
import { defaultTemplate } from 'core/utils'
import { BasicInput, BasicTextArea, BasicCheckBox } from 'core/components';
import _ from 'lodash';

function GrantPurposeTypeTemplate(
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
            {form.$('grantPurposeTypeId').value === inMemoryOfId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicInput field={form.$('purposeMemberName')} />
                    </div>
                </div>}

            {form.$('grantPurposeTypeId').value === inHonorOfId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicInput field={form.$('purposeMemberName')} />
                    </div>
                </div>}

            {form.$('grantPurposeTypeId').value === sponsorAFriendId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicInput field={form.$('purposeMemberName')} />
                    </div>
                </div>}

            {form.$('grantPurposeTypeId').value === otherId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        {t("GRANTCREATEEDITFORM.PURPOSEOTHER")}
                    </div>
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicTextArea field={form.$('additionalInformation')} />
                    </div>
                </div>
            }

            {form.$('grantPurposeTypeId').value === charityEventId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicCheckBox field={form.$('charityEventAttending')} />
                    </div>
                    {form.$('charityEventAttending').value === true ?
                        <div className="form__group f-col f-col-lrg-12">
                            {t("GRANTCREATEEDITFORM.PURPOSECHARITYEVENTATTENDING")}
                        </div>
                        :
                        <div className="form__group f-col f-col-lrg-12">
                            {t("GRANTCREATEEDITFORM.PURPOSECHARITYEVENTNOTATTENDING")}
                        </div>}
                </div>}

            {form.$('grantPurposeTypeId').value === membershipId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        {t("GRANTCREATEEDITFORM.PURPOSEMEMBERSHIP")}
                    </div>
                </div>}

            {form.$('grantPurposeTypeId').value === nonBindingPledgeId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        {t("GRANTCREATEEDITFORM.PURPOSENONBINDINGPLEDGE")}
                    </div>
                </div>}
        </React.Fragment>
    )
};


export default defaultTemplate(GrantPurposeTypeTemplate);