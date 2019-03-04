import React from 'react';
import { defaultTemplate } from 'core/utils';
import { PhoneNumberEdit } from 'modules/phone-number/pages';

function DonorAccountPhoneNumberEditTemplate({ donorAccountPhoneNumberEditViewStore }) {
    const {
        items,
        onChangePrimaryPhoneNumber,
        getResource,
        hide,
        onShowHideChange
    } = donorAccountPhoneNumberEditViewStore;

    return (
        <React.Fragment>
            <div className="group">
                <div className="display--b pull">Hide Phone Number Informations</div>
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
                    {items && items.map((donorAccountPhoneNumber, i) =>
                        <React.Fragment key={donorAccountPhoneNumber.id} >
                            {!donorAccountPhoneNumber.primary && markPrimary(onChangePrimaryPhoneNumber)}
                            <PhoneNumberEdit
                                id={donorAccountPhoneNumber.phoneNumberId}
                                title={donorAccountPhoneNumber.primary ? 'Primary Phone Number' : 'Secondary Phone Number'}
                            ></PhoneNumberEdit>
                        </React.Fragment>
                    )}

                    {items && items.length < 2 && <PhoneNumberEdit onAfterCreate={getResource} title={'You can add secondary Phone Number'} />}
                </React.Fragment>
            }
        </React.Fragment >
    );
}

function markPrimary(onChangePrimaryPhoneNumber) {
    return (
        <button
            onClick={onChangePrimaryPhoneNumber}
            className="btn btn--med btn--ghost"
            type="button">
            Switch Primary Phone Number
                </button>
    )
}

export default defaultTemplate(DonorAccountPhoneNumberEditTemplate);
