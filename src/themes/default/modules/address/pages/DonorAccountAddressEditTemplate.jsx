import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls, BasicCheckBox } from 'core/components';
import { AddressEdit } from 'modules/address/pages';

function DonorAccountAddressEditTemplate({ donorAccountAddressEditViewStore }) {
    const {
        items,
        onChangePrimaryAddress,
        getResource
    } = donorAccountAddressEditViewStore;

    return (
        <React.Fragment>
            {items && items.map((donorAccountAddress, i) =>
                <React.Fragment key={donorAccountAddress.id} >
                    {!donorAccountAddress.primary && markPrimary(onChangePrimaryAddress)}
                    <AddressEdit
                        id={donorAccountAddress.addressId}
                        title={donorAccountAddress.primary ? 'Primary Address' : 'Secondary Address'}
                    ></AddressEdit>
                </React.Fragment>
            )}

            {items && items.length < 2 && <AddressEdit onAfterCreate={getResource} title={'You can add secondary address'} />}
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
