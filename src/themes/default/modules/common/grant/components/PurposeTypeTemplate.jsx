import React from 'react';
import { BasicInput, BasicTextArea, BasicCheckBox } from 'core/components';
import { defaultTemplate } from 'core/utils';

function OtherPurposeType({ field, t }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                {t("GRANTCREATEFORM.PURPOSEOTHER")}
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
                    {t("GRANTCREATEFORM.PURPOSECHARITYEVENTATTENDING")}
                </div>
                :
                <div className="form__group f-col f-col-lrg-12">
                    {t("GRANTCREATEFORM.PURPOSECHARITYEVENTNOTATTENDING")}
                </div>}
        </div>
    )
});

function InMemoryOfEventPurposeType({ fieldFirstName, fieldLastName }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={fieldFirstName} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={fieldLastName} />
            </div>
        </div>
    )
}


function InHonorOfEventPurposeType({ fieldFirstName, fieldLastName }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={fieldFirstName} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={fieldLastName} />
            </div>
        </div>
    )
}

function SponsorAFriendPurposeType({ fieldFirstName, fieldLastName }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={fieldFirstName} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={fieldLastName} />
            </div>
        </div>
    )
}

function MembershipPurposeType({ t }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                {t("GRANTCREATEFORM.PURPOSEMEMBERSHIP")}
            </div>
        </div>
    )
}

function NonBindingPledgePurposeType({ t }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
                {t("GRANTCREATEFORM.PURPOSENONBINDINGPLEDGE")}
            </div>
        </div>
    )
}


export {
    OtherPurposeType, InMemoryOfEventPurposeType, InHonorOfEventPurposeType, SponsorAFriendPurposeType,
    MembershipPurposeType, NonBindingPledgePurposeType, CharityEventPurposeType
}