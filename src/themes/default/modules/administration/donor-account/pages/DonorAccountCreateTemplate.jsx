import React from 'react';
import { BasicInput, BasicFormatFieldInput, BaasicFieldDropdown, BasicCheckBox } from 'core/components';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout } from 'core/layouts';
import { CreateLoginTemplate } from 'themes/modules/common/donor-account/components';
import { NonMemberTemplate } from 'themes/modules/common/non-member/components';
import { DonorAccountSettingsTemplate } from 'themes/modules/administration/donor-account/components';
import { AddressTemplate } from 'themes/modules/common/address/components';
import { EmailAddressTemplate } from 'themes/modules/common/email-address/components';
import { PhoneNumberTemplate } from 'themes/modules/common/phone-number/components';

function DonorAccountCreateTemplate({ donorAccountCreateViewStore }) {
    const {
        form,
        loading,
        basicId,
        premiumId,
        prefixTypeDropdownStore,
        businessTypeDropwdownStore,
        onChangeAccountType,
        deliveryMethodTypeDropdownStore
    } = donorAccountCreateViewStore;

    return (
        <EditFormLayout form={form} isEdit={true} loading={loading} className="col col-sml-12">
            <h3 className="spc--bottom--sml">Register</h3>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-4">
                    <input
                        type="radio"
                        name={form.$('accountTypeId').name}
                        value={form.$('accountTypeId').value}
                        checked={form.$('accountTypeId').value === basicId}
                        onChange={e => onChangeAccountType(basicId)} />Basic
                    <input
                        type="radio"
                        name={form.$('accountTypeId').name}
                        value={form.$('accountTypeId').value}
                        checked={form.$('accountTypeId').value === premiumId}
                        onChange={e => onChangeAccountType(premiumId)} />Premium
                </div>
            </div>
            {form.$('accountTypeId').value !== '' &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <input
                                type="radio"
                                name={form.$('isCompany').name}
                                value={form.$('isCompany').value}
                                checked={form.$('isCompany').value === false}
                                onChange={e => form.$('isCompany').set('value', false)} />Personal
                            <input
                                type="radio"
                                name={form.$('isCompany').name}
                                value={form.$('isCompany').value}
                                checked={form.$('isCompany').value === true}
                                onChange={e => form.$('isCompany').set('value', true)} />Company
                        </div>
                    </div>
                    {form.$('isCompany').value !== '' &&
                        <React.Fragment>
                            <div className="f-row card card--sml card--primary">
                                {form.$('isCompany').value &&
                                    <React.Fragment>
                                        <div className="form__group f-col f-col-lrg-12">
                                            <h5>Company Profile</h5>
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            {businessTypeDropwdownStore &&
                                                <BaasicFieldDropdown field={form.$('companyProfile.businessTypeId')} store={businessTypeDropwdownStore} />}
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <BasicInput field={form.$('companyProfile.name')} />
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <BasicInput field={form.$('companyProfile.dba')} />
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <BasicInput field={form.$('companyProfile.website')} />
                                        </div>
                                    </React.Fragment>}

                                {form.$('isCompany').value === false &&
                                    <React.Fragment>
                                        <div className="form__group f-col f-col-lrg-12">
                                            <h5>Profile</h5>
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            {prefixTypeDropdownStore &&
                                                <BaasicFieldDropdown field={form.$('coreUser.prefixTypeId')} store={prefixTypeDropdownStore} />}
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <BasicInput field={form.$('coreUser.firstName')} />
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <BasicInput field={form.$('coreUser.middleName')} />
                                        </div>
                                        <div className="form__group f-col f-col-lrg-3">
                                            <BasicInput field={form.$('coreUser.lastName')} />
                                        </div>
                                    </React.Fragment>}

                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('fundName')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicFormatFieldInput field={form.$('securityPin')} format="####" mask="*" />
                                </div>

                                <AddressTemplate
                                    field={form.$('address')}
                                    addressLine1Column={3}
                                    addressLine2Column={3}
                                    cityColumn={3}
                                    stateColumn={3}
                                    zipCodeColumn={3}
                                    descriptionColumn={3}
                                />

                                <EmailAddressTemplate field={form.$('emailAddress')} emailColumn={3} descriptionColumn={3} />
                                <PhoneNumberTemplate field={form.$('phoneNumber')} numberColumn={3} descriptionColumn={3} />
                                {/* <BasicFieldRecaptcha field={form.$('botProtection')} /> */}
                            </div>

                            <div className="f-row card card--sml card--primary">
                                <DonorAccountSettingsTemplate
                                    form={form}
                                    deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
                                    title="Account Settings"
                                    premiumId={premiumId} />
                            </div>

                            {form.$('isCompany').value &&
                                <React.Fragment>
                                    <div>
                                        <BasicCheckBox field={form.$('companyProfile.hasCompanyContact')} />
                                    </div>

                                    {form.$('companyProfile.hasCompanyContact').value &&
                                        <div className="f-row card card--sml card--primary">
                                            <NonMemberTemplate
                                                form={form.$('companyProfile.contactPerson')}
                                                title="Contact Informations"
                                                nameColumn={3}
                                                addressLine1Column={3} addressLine2Column={3} cityColumn={2} stateColumn={2} zipCodeColumn={2}
                                                emailColumn={3}
                                                numberColumn={3}
                                            />
                                        </div>}
                                </React.Fragment>}

                            <div className="f-row card card--sml card--primary">
                                <CreateLoginTemplate
                                    coreUserfields={form.$('coreUser')}
                                    sendWelcomeEmailField={form.$('sendWelcomeEmail')}
                                    isApprovedField={form.$('isApproved')}
                                    emailAddressField={form.$('emailAddress.email')}
                                />
                            </div>
                        </React.Fragment>}
                </React.Fragment>}
        </EditFormLayout >
    );
}

export default defaultTemplate(DonorAccountCreateTemplate);
