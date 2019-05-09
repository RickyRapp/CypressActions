import React from 'react';
import { defaultTemplate } from 'core/utils';
import { AddressEdit, DonorAccountAddressCreate } from 'modules/common/address/pages';

function DonorAccountAddressEditTemplate({ donorAccountAddressEditViewStore }) {
    const {
        items,
        onMarkPrimaryAddress,
        getResource,
        userId
    } = donorAccountAddressEditViewStore;

    return (
        <React.Fragment>
            {items && items.sort((x, y) => { return (x.donorAccountAddresses[0].primary === y.donorAccountAddresses[0].primary) ? 0 : x.donorAccountAddresses[0].primary ? -1 : 1; }).map((address, i) =>
                <React.Fragment key={address.dateUpdated} >
                    <AddressEdit
                        id={address.id}
                        key={address.dateUpdated}
                        item={address}
                        onAfterUpdate={getResource}
                        title={address.donorAccountAddresses[0].primary ? 'Primary Address' : 'Secondary Address'}
                    >
                        {!address.donorAccountAddresses[0].primary && markPrimary(address.id, onMarkPrimaryAddress)}
                    </AddressEdit>
                </React.Fragment >
            )}
            {items && items.length < 2 && <DonorAccountAddressCreate onAfterCreate={getResource} title={'Add Secondary address'} userId={userId} />}
        </React.Fragment >
    );
}

function markPrimary(addressId, onMarkPrimaryAddress) {
    return (
        <button
            onClick={() => onMarkPrimaryAddress(addressId)}
            className="btn btn--sml btn--ghost"
            type="button">
            Mark Primary
        </button>
    )
}

export default defaultTemplate(DonorAccountAddressEditTemplate);
