import React from 'react';
import { defaultTemplate } from 'core/utils';
import { AddressEdit, DonorAccountAddressCreate } from 'modules/address/pages';

function DonorAccountAddressEditTemplate({ donorAccountAddressEditViewStore }) {
    const {
        items,
        onChangePrimaryAddress,
        getResource,
        userId
    } = donorAccountAddressEditViewStore;

    return (
        <React.Fragment>
            {items && items.map((donorAccountAddress, i) =>
                <React.Fragment key={donorAccountAddress.dateUpdated} >
                    {!donorAccountAddress.primary && markPrimary(onChangePrimaryAddress)}
                    <AddressEdit
                        id={donorAccountAddress.addressId}
                        key={donorAccountAddress.dateUpdated}
                        item={donorAccountAddress.address}
                        onAfterUpdate={getResource}
                        title={donorAccountAddress.primary ? 'Primary Address' : 'Secondary Address'}
                    ></AddressEdit>
                </React.Fragment >
            )}
            {items && items.length < 2 && <DonorAccountAddressCreate onAfterCreate={getResource} title={'You can add secondary address'} userId={userId} />}
        </React.Fragment >
    );
}

function markPrimary(onChangePrimaryAddress) {
    return (
        <button
            onClick={onChangePrimaryAddress}
            className="btn btn--med btn--ghost"
            type="button">
            Switch Primary Address
        </button>
    )
}

export default defaultTemplate(DonorAccountAddressEditTemplate);
