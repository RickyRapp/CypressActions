import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicCheckBox, BasicFormatFieldInput } from 'core/components';

function CreateBankAccountTemplate({ form }) {

    return (
        <React.Fragment>
            <React.Fragment>
                <div className="form__group f-col f-col-lrg-12">
                    <h5>Bank Account Information</h5>
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('name')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('description')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('accountNumber')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicFormatFieldInput field={form.$('routingNumber')} format="###-###-###" mask="*" />
                </div>
            </React.Fragment>

            {form.has('thirdParty') && form.$('thirdParty').value === true &&
                <React.Fragment>
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicCheckBox field={form.$('thirdParty')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-12">
                        Account Holder Information
                    <div className="f-row">
                            <div className="form__group f-col f-col-lrg-6">
                                <BasicInput field={form.$('thirdPartyAccountHolder.firstName')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-6">
                                <BasicInput field={form.$('thirdPartyAccountHolder.lastName')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-6">
                                <BasicInput field={form.$('thirdPartyAccountHolder.address.addressLine1')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-6">
                                <BasicInput field={form.$('thirdPartyAccountHolder.address.addressLine2')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('thirdPartyAccountHolder.address.city')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('thirdPartyAccountHolder.address.state')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('thirdPartyAccountHolder.address.zipCode')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('thirdPartyAccountHolder.emailAddress.email')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('thirdPartyAccountHolder.phoneNumber.number')} />
                            </div>
                        </div>
                    </div>
                </React.Fragment>}
        </React.Fragment>
    );
}



export default defaultTemplate(CreateBankAccountTemplate);
