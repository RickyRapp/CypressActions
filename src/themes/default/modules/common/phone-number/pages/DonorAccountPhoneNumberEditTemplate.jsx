import React from 'react';
import { defaultTemplate } from 'core/utils';
import { PhoneNumberEdit, DonorAccountPhoneNumberCreate } from 'modules/common/phone-number/pages';

function DonorAccountPhoneNumberEditTemplate({ donorAccountPhoneNumberEditViewStore }) {
    const {
        items,
        onMarkPrimaryPhoneNumber,
        getResource,
        userId
    } = donorAccountPhoneNumberEditViewStore;

    return (
        <React.Fragment>
            {items && items.sort((x, y) => { return (x.donorAccountPhoneNumbers[0].primary === y.donorAccountPhoneNumbers[0].primary) ? 0 : x.donorAccountPhoneNumbers[0].primary ? -1 : 1; }).map((phoneNumber, i) =>
                <React.Fragment key={phoneNumber.dateUpdated} >
                    <PhoneNumberEdit
                        id={phoneNumber.id}
                        key={phoneNumber.dateUpdated}
                        item={phoneNumber}
                        onAfterUpdate={getResource}
                        title={phoneNumber.donorAccountPhoneNumbers[0].primary ? 'Primary Phone Number' : 'Secondary Phone Number'}
                    >
                        {!phoneNumber.donorAccountPhoneNumbers[0].primary && markPrimary(phoneNumber.id, onMarkPrimaryPhoneNumber)}
                    </PhoneNumberEdit>
                </React.Fragment >
            )}
            {items && items.length < 2 && <DonorAccountPhoneNumberCreate onAfterCreate={getResource} title={'You can add secondary Phone Number'} userId={userId} />}
        </React.Fragment>
    );
}

function markPrimary(phoneNumberId, onMarkPrimaryPhoneNumber) {
    return (
        <button
            onClick={() => onMarkPrimaryPhoneNumber(phoneNumberId)}
            className="btn btn--med btn--ghost"
            type="button">
            Mark Primary
        </button>
    )
}

export default defaultTemplate(DonorAccountPhoneNumberEditTemplate);
