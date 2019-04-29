import React from 'react';
import { BasicInput } from 'core/components';

function ContactInformationTemplate({ field }) {
    return (
        <div className="f-row card card--sml">
            <div className="form__group f-col f-col-lrg-12">
                <h5>Contact Information</h5>
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field.$('firstName')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field.$('lastName')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field.$('address.addressLine1')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field.$('address.addressLine2')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('address.city')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('address.state')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('address.zipCode')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('emailAddress.email')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('phoneNumber.number')} />
            </div>
        </div>
    );
}

export default ContactInformationTemplate;


