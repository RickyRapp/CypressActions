import React from 'react';
import { BasicInput, BasicTextArea, BasicCheckBox } from 'core/components';
import { defaultTemplate } from 'core/utils';

function OtherPurposeType({ field, t }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                {t("GRANTCREATEEDITFORM.PURPOSEOTHER")}
            </div>
            <div className="form__group f-col f-col-lrg-12">
                <BasicTextArea field={field} />
            </div>
        </div>
    )
}

const CharityEventPurposeType = defaultTemplate(({ field, t }) => {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                <BasicCheckBox field={field} />
            </div>
            {field.value === true ?
                <div className="form__group f-col f-col-lrg-12">
                    {t("GRANTCREATEEDITFORM.PURPOSECHARITYEVENTATTENDING")}
                </div>
                :
                <div className="form__group f-col f-col-lrg-12">
                    {t("GRANTCREATEEDITFORM.PURPOSECHARITYEVENTNOTATTENDING")}
                </div>}
        </div>
    )
});

function InMemoryOfEventPurposeType({ fieldName }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                <BasicInput field={fieldName} />
            </div>
        </div>
    )
}


function InHonorOfEventPurposeType({ fieldName }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                <BasicInput field={fieldName} />
            </div>
        </div>
    )
}

function SponsorAFriendPurposeType({ fieldName }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                <BasicInput field={fieldName} />
            </div>
        </div>
    )
}

function MembershipPurposeType({ t }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                {t("GRANTCREATEEDITFORM.PURPOSEMEMBERSHIP")}
            </div>
        </div>
    )
}

function NonBindingPledgePurposeType({ t }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                {t("GRANTCREATEEDITFORM.PURPOSENONBINDINGPLEDGE")}
            </div>
        </div>
    )
}


export {
    OtherPurposeType, InMemoryOfEventPurposeType, InHonorOfEventPurposeType, SponsorAFriendPurposeType,
    MembershipPurposeType, NonBindingPledgePurposeType, CharityEventPurposeType
}