import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls } from 'core/components';

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
                                <BasicInput field={form.$('thirdPartyAccountHolder.firstName')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('thirdPartyAccountHolder.lastName')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
                                <BasicInput field={form.$('thirdPartyAccountHolder.address.addressLine1')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-4">
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
                    </div>}

                {form.isDirty &&
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(BankAccountCreateTemplate);
