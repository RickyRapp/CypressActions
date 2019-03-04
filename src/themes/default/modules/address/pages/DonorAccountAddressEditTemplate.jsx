import React from 'react';
import { defaultTemplate } from 'core/utils';
import { AddressEdit } from 'modules/address/pages';

function DonorAccountAddressEditTemplate({ donorAccountAddressEditViewStore }) {
    const {
        items,
        onChangePrimaryAddress,
        getResource,
        hide,
        onShowHideChange
    } = donorAccountAddressEditViewStore;

    return (
        <React.Fragment>
            <div className="group">
                <div className="display--b pull">Hide Address Informations</div>
                <div className="display--b pull spc--left--sml">
                    <input
                        type="checkbox"
                        onChange={onShowHideChange}
                        checked={hide}
                    />
                </div>
            </div>
            {!hide &&
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
                </React.Fragment>
            }
        </React.Fragment>
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
