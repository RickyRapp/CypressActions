import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicCheckBox, BasicFormatFieldInput } from 'core/components';
import { AddressTemplate } from 'themes/modules/common/address/components';
import { EmailAddressTemplate } from 'themes/modules/common/email-address/components';
import { PhoneNumberTemplate } from 'themes/modules/common/phone-number/components';
import ReactTooltip from 'react-tooltip'

function BankAccountTemplate({ form, imgPreview, title = 'Bank Account Information' }) {

    return (
        <React.Fragment>
            <React.Fragment>
                <div className="form__group f-col f-col-lrg-12">
                    <h5>{title}</h5>
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
                {form.has('image') &&
                    <div className="form__group f-col f-col-lrg-5">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-6">
                                <input
                                    {...form.$('image').bind()}
                                />
                            </div>
                            <div className="form__group f-col f-col-lrg-6">
                                {form.$('image').files &&
                                    <span>{form.$('image').files[0].name}</span>
                                }
                            </div>
                        </div>
                    </div>}
                <div className="form__group f-col f-col-lrg-1">
                    {imgPreview &&
                        <React.Fragment>
                            <span className='icomoon sml icon-official-building-3' data-tip data-for={`imgPreview_${form.$('accountNumber').value}`} onClick={() => window.open(imgPreview, '_blank')} />
                            <ReactTooltip type='info' effect='solid' place="right" id={`imgPreview_${form.$('accountNumber').value}`}>
                                <img src={imgPreview} width="300" height="300" />
                            </ReactTooltip>
                        </React.Fragment>}
                </div>
            </React.Fragment>

            {form.has('thirdParty') &&
                <React.Fragment>
                    <div className="form__group f-col f-col-lrg-12">
                        <BasicCheckBox field={form.$('thirdParty')} />
                    </div>

                    {form.$('thirdParty').value === true &&
                        <div className="form__group f-col f-col-lrg-12">
                            Account Holder Information
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicInput field={form.$('thirdPartyAccountHolder.firstName')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicInput field={form.$('thirdPartyAccountHolder.lastName')} />
                                </div>

                                <AddressTemplate field={form.$('thirdPartyAccountHolder.address')} />
                                <EmailAddressTemplate field={form.$('thirdPartyAccountHolder.emailAddress')} />
                                <PhoneNumberTemplate field={form.$('thirdPartyAccountHolder.phoneNumber')} />
                            </div>
                        </div>}
                </React.Fragment>}
        </React.Fragment>
    );
}



export default defaultTemplate(BankAccountTemplate);
