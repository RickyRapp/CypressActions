import React from 'react';
import { AddressTemplate } from 'themes/modules/common/address/components';
import { EmailAddressTemplate } from 'themes/modules/common/email-address/components';
import { PhoneNumberTemplate } from 'themes/modules/common/phone-number/components';
import { BasicInput } from 'core/components';

function NonMemberTemplate({
    form,
    title = null,
    firstNameColumn = 4,
    lastNameColumn = 4,
    emailColumn = 4,
    emailDescriptionColumn = 4,
    numberColumn = 4,
    numberDescriptionColumn = 4,
    addressLine1Column = 4,
    addressLine2Column = 4,
    cityColumn = 3,
    stateColumn = 3,
    zipCodeColumn = 3,
    addressDescriptionColumn = 4
}) {

    return (
        <React.Fragment>
            {title &&
                <div className="form__group f-col f-col-lrg-12">
                    <h5>{title}</h5>
                </div>}
            <div className={`form__group f-col f-col-lrg-${firstNameColumn}`}>
                <BasicInput field={form.$('firstName')} />
            </div>
            <div className={`form__group f-col f-col-lrg-${lastNameColumn}`}>
                <BasicInput field={form.$('lastName')} />
            </div>

            <AddressTemplate
                field={form.$('address')}
                addressLine1Column={addressLine1Column}
                addressLine2Column={addressLine2Column}
                cityColumn={cityColumn}
                stateColumn={stateColumn}
                zipCodeColumn={zipCodeColumn}
                descriptionColumn={addressDescriptionColumn}
            />

            <EmailAddressTemplate field={form.$('emailAddress')} emailColumn={emailColumn} descriptionColumn={emailDescriptionColumn} />
            <PhoneNumberTemplate field={form.$('phoneNumber')} numberColumn={numberColumn} descriptionColumn={numberDescriptionColumn} />
        </React.Fragment>
    );
}

export default NonMemberTemplate;