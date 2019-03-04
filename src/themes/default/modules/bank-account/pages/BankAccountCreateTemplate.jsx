import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls, BasicCheckBox } from 'core/components';

function BankAccountCreateTemplate({ bankAccountEditViewStore, title, children }) {
    const {
        form,
        loading,
        thirdParty,
        onThirdPartyChange
    } = bankAccountEditViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <h3>{title}</h3>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    Bank Account Information
                    <div className="f-row">
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
                            <BasicInput field={form.$('routingNumber')} />
                        </div>
                    </div>
                    <div className="group">
                        <div className="display--b pull">Third Party Bank Account</div>
                        <div className="display--b pull spc--left--sml">
                            <input
                                type="checkbox"
                                onChange={onThirdPartyChange}
                            />
                        </div>
                    </div>
                </div>

                {thirdParty &&
                    <div className="form__group f-col f-col-lrg-12">
                        Account Holder Information
                    <div className="f-row">
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.firstName')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.lastName')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.middleName')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.address.addressLine1')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.address.addressLine2')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.address.city')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.address.state')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.address.zipCode')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.emailAddress.email')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('accountHolder.phoneNumber.number')} />
                            </div>
                        </div>
                    </div>}

                {children &&
                    <div className="form__group f-col f-col-lrg-4">
                        {children}
                    </div>}

                {form.changed &&
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(BankAccountCreateTemplate);
