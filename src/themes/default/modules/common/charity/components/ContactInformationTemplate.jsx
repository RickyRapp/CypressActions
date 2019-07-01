import React from 'react';
import { BasicInput, BasicFormatFieldInput } from 'core/components';
import { AddressTemplate } from 'themes/modules/common/address/components';

function ContactInformationTemplate({ field }) {
    return (
        <div className="f-row card card--sml">
            <div className="form__group f-col f-col-lrg-12">
                <h5>Contact Information</h5>
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field.$('name')} />
            </div>

            <AddressTemplate field={field.$('address')} />

            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('emailAddress.email')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicFormatFieldInput field={field.$('phoneNumber.number')} format="(###) ###-####" mask="*" />
            </div>
        </div>
    );
}

export default ContactInformationTemplate;


