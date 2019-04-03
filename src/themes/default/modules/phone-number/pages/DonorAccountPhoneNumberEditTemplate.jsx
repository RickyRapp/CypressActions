import React from 'react';
import { defaultTemplate } from 'core/utils';
import { PhoneNumberEdit, DonorAccountPhoneNumberCreate } from 'modules/phone-number/pages';

function DonorAccountPhoneNumberEditTemplate({ donorAccountPhoneNumberEditViewStore }) {
    const {
        items,
        onChangePrimaryPhoneNumber,
        getResource
    } = donorAccountPhoneNumberEditViewStore;

    return (
        <React.Fragment>
            {items && items.map((donorAccountPhoneNumber, i) =>
                <React.Fragment key={donorAccountPhoneNumber.id} >
                    {!donorAccountPhoneNumber.primary && markPrimary(onChangePrimaryPhoneNumber)}
                    <PhoneNumberEdit
                        id={donorAccountPhoneNumber.phoneNumberId}
                        key={donorAccountPhoneNumber.dateUpdated}
                        item={donorAccountPhoneNumber.phoneNumber}
                        onAfterUpdate={getResource}
                        title={donorAccountPhoneNumber.primary ? 'Primary Phone Number' : 'Secondary Phone Number'}
                    ></PhoneNumberEdit>
                </React.Fragment>
            )}
            {items && items.length < 2 && <DonorAccountPhoneNumberCreate onAfterCreate={getResource} title={'You can add secondary Phone Number'} />}
        </React.Fragment>
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
