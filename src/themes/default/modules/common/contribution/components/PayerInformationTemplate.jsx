import React from 'react';
import { BasicInput } from 'core/components';

function PayerInformationTemplate({ form }) {

    return (
        <div className="f-row card card--sml">
            <div className="form__group f-col f-col-lrg-12">
                <h5>Payer Information</h5>
            </div>
            <div className="form__group f-col f-col-lrg-12">
                <BasicInput field={form.$('payerInformation.name')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('payerInformation.address.addressLine1')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('payerInformation.address.addressLine2')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.address.city')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.address.state')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.address.zipCode')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.emailAddress.email')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.phoneNumber.number')} />
            </div>
        </div>
    );
}

export default PayerInformationTemplate;


