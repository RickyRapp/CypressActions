import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EmailAddressEdit } from 'modules/email-address/pages';

function DonorAccountEmailAddressEditTemplate({ donorAccountEmailAddressEditViewStore }) {
    const {
        items,
        onChangePrimaryEmailAddress,
        getResource,
        hide,
        onShowHideChange
    } = donorAccountEmailAddressEditViewStore;

    return (
        <React.Fragment>
            <div className="group">
                <div className="display--b pull">Hide Email Address Informations</div>
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
            }
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
