import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EmailAddressEdit, DonorAccountEmailAddressCreate } from 'modules/common/email-address/pages';

function DonorAccountEmailAddressEditTemplate({ donorAccountEmailAddressEditViewStore }) {
    const {
        items,
        onMarkPrimaryEmailAddress,
        getResource,
        userId
    } = donorAccountEmailAddressEditViewStore;

    return (
        <React.Fragment>
            {items && items.sort((x, y) => { return (x.donorAccountEmailAddresses[0].primary === y.donorAccountEmailAddresses[0].primary) ? 0 : x.donorAccountEmailAddresses[0].primary ? -1 : 1; }).map((emailAddress, i) =>
                <React.Fragment key={emailAddress.dateUpdated} >
                    <EmailAddressEdit
                        id={emailAddress.id}
                        key={emailAddress.dateUpdated}
                        item={emailAddress}
                        onAfterUpdate={getResource}
                        title={emailAddress.donorAccountEmailAddresses[0].primary ? 'Primary Email Address' : 'Secondary Email Address'}
                    >
                        {!emailAddress.donorAccountEmailAddresses[0].primary && markPrimary(emailAddress.id, onMarkPrimaryEmailAddress)}
                    </EmailAddressEdit>
                </React.Fragment >
            )}

            {items && items.length < 2 && <DonorAccountEmailAddressCreate onAfterCreate={getResource} title={'Add Secondary Email Address'} userId={userId} />}
        </React.Fragment>
    );
}

function markPrimary(emailAddressId, onMarkPrimaryEmailAddress) {
    return (
        <button
            onClick={() => onMarkPrimaryEmailAddress(emailAddressId)}
            className="btn btn--sml btn--ghost"
            type="button">
            Mark Primary
        </button>
    )
}

export default defaultTemplate(DonorAccountEmailAddressEditTemplate);
