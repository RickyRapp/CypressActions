import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EmailAddressEdit } from 'modules/email-address/pages';

function DonorAccountEmailAddressEditTemplate({ donorAccountEmailAddressEditViewStore }) {
    const {
        items,
        onChangePrimaryEmailAddress,
        getResource
    } = donorAccountEmailAddressEditViewStore;

    return (
        <React.Fragment>
            {items && items.map((donorAccountEmailAddress, i) =>
                <React.Fragment key={donorAccountEmailAddress.id} >
                    {!donorAccountEmailAddress.primary && markPrimary(onChangePrimaryEmailAddress)}
                    <EmailAddressEdit
                        id={donorAccountEmailAddress.emailAddressId}
                        title={donorAccountEmailAddress.primary ? 'Primary Email Address' : 'Secondary Email Address'}
                    ></EmailAddressEdit>
                </React.Fragment>
            )}

            {items && items.length < 2 && <EmailAddressEdit onAfterCreate={getResource} title={'You can add secondary email address'} />}
        </React.Fragment>
    );
}

function markPrimary(onChangePrimaryEmailAddress) {
    return (
        <button
            onClick={onChangePrimaryEmailAddress}
            className="btn btn--med btn--ghost"
            type="button">
            Switch Primary Email Address
                </button>
    )
}

export default defaultTemplate(DonorAccountEmailAddressEditTemplate);
