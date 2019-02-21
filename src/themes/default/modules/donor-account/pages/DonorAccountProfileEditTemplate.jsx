import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicDropdown, BaasicButton, EditFormContent, BaasicFormControls, BasicCheckBox } from 'core/components';
import { AddressEdit } from 'modules/address/pages';
import { EmailAddressEdit } from 'modules/email-address/pages';
import { PhoneNumberEdit } from 'modules/phone-number/pages';

function DonorAccountProfileEditTemplate({ profileEditViewStore }) {
    const {
        form,
        loading,
        deliveryMethodTypeMultiSelectStore,
        prefixTypeMultiSelectStore,
        rootStore,
        onChangePrimaryAddress,
        onChangePrimaryEmailAddress,
        onChangePrimaryPhoneNumber
    } = profileEditViewStore;

    const border = {
        borderStyle: "solid"
    };

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    const donorAccountAddressesLength = form.$('donorAccountAddresses').value.length;
    const donorAccountEmailAddressesLength = form.$('donorAccountEmailAddresses').value.length;
    const donorAccountPhoneNumbersLength = form.$('donorAccountPhoneNumbers').value.length;

    return (
        <React.Fragment>
            <EditFormContent form={form} isEdit={true} loading={loading}>
                <h3>Profile Informations</h3>

                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label>Prefix Type</label>
                            <BaasicDropdown classNames="input" field={form.$('coreUser').$('prefixType')} store={prefixTypeMultiSelectStore} />
                        </div>
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('coreUser').$('firstName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('coreUser').$('middleName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('coreUser.lastName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('fundName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('blankBookletMax')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('notificationLimitRemainderAmount')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label>Delivery Method Type</label>
                            <BaasicDropdown classNames="input" field={form.$('deliveryMethodType')} store={deliveryMethodTypeMultiSelectStore} />
                        </div>
                    </div>
                </div>

                <div style={border} >
                    {form.$('donorAccountAddresses').map((donorAccountAddress, i) =>
                        <React.Fragment key={donorAccountAddress.key}>
                            <div className="f-row">
                                <AddressEdit
                                    donorAccountAddress={donorAccountAddress}
                                    onChangePrimaryAddress={onChangePrimaryAddress}
                                />
                            </div>
                            {donorAccountAddressesLength !== i + 1 &&
                                <ColoredLine color="black" />
                            }
                        </React.Fragment>
                    )}
                    {form.$('donorAccountAddresses').value.length < 3 &&
                        <button
                            className="btn btn--med btn--ghost"
                            type="button"
                            onClick={form.$('donorAccountAddresses').onAdd}
                            data-tip={`Add ${form.$('donorAccountAddresses').label}`}
                        >Add Address
                </button>
                    }
                </div>

                <div style={border} >
                    {form.$('donorAccountEmailAddresses').map((donorAccountEmailAddress, i) =>
                        <React.Fragment key={donorAccountEmailAddress.key}>
                            <div className="f-row">
                                <EmailAddressEdit
                                    donorAccountEmailAddress={donorAccountEmailAddress}
                                    onChangePrimaryEmailAddress={onChangePrimaryEmailAddress}
                                />
                            </div>
                            {donorAccountEmailAddressesLength !== i + 1 &&
                                <ColoredLine color="black" />
                            }
                        </React.Fragment>
                    )}
                    {form.$('donorAccountEmailAddresses').value.length < 3 &&
                        <button
                            className="btn btn--med btn--ghost"
                            type="button"
                            onClick={form.$('donorAccountEmailAddresses').onAdd}
                            data-tip={`Add ${form.$('donorAccountEmailAddresses').label}`}
                        >Add Email Address
                </button>
                    }
                </div>

                <div style={border} >
                    {form.$('donorAccountPhoneNumbers').map((donorAccountPhoneNumber, i) =>
                        <React.Fragment key={donorAccountPhoneNumber.key}>
                            <div className="f-row">
                                <PhoneNumberEdit
                                    donorAccountPhoneNumber={donorAccountPhoneNumber}
                                    onChangePrimaryPhoneNumber={onChangePrimaryPhoneNumber}
                                />
                            </div>
                            {donorAccountPhoneNumbersLength !== i + 1 &&
                                <ColoredLine color="black" />
                            }
                        </React.Fragment>
                    )}
                    {form.$('donorAccountPhoneNumbers').value.length < 3 &&
                        <button
                            className="btn btn--med btn--ghost"
                            type="button"
                            onClick={form.$('donorAccountPhoneNumbers').onAdd}
                            data-tip={`Add ${form.$('donorAccountPhoneNumbers').label}`}
                        >Add Phone Number
                </button>
                    }
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </EditFormContent >
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountProfileEditTemplate);
