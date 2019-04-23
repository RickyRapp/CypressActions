import React from 'react';
import { BasicInput, BasicFormatFieldInput, BaasicFieldDropdown, BasicCheckBox } from 'core/components';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout } from 'core/layouts';
import { DonorAccountSettingsEdit } from 'themes/modules/administration/donor-account/components';
import ReactTooltip from 'react-tooltip'

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
                    {form.$('accountTypeId').value &&
                        <React.Fragment>
                            {form.$('isCompany').value &&
                                <div className="f-row card card--sml card--primary">
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
                                    <div className="form__group f-col f-col-lrg-3">
                                        <BasicInput field={form.$('companyProfile.address.addressLine1')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-3">
                                        <BasicInput field={form.$('companyProfile.address.addressLine2')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-3">
                                        <BasicInput field={form.$('companyProfile.address.city')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-3">
                                        <BasicInput field={form.$('companyProfile.address.state')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-3">
                                        <BasicInput field={form.$('companyProfile.address.zipCode')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-3">
                                        <BasicInput field={form.$('companyProfile.emailAddress.email')} />
                                    </div>
                                    <div className="form__group f-col f-col-lrg-3">
                                        <BasicFormatFieldInput field={form.$('companyProfile.phoneNumber.number')} format="+1 (###) ###-####" mask="_" />
                                    </div>
                                </div>}

                            <div className="f-row card card--sml card--primary">
                                <div className="form__group f-col f-col-lrg-12">
                                    {form.$('isCompany').value &&
                                        <h5>Main Contact</h5>}
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
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('fundName')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('coreUser.coreMembership.password')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('coreUser.coreMembership.confirmPassword')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('address.addressLine1')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('address.addressLine2')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('address.city')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('address.state')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('address.zipCode')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('address.description')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('emailAddress.email')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('emailAddress.description')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicFormatFieldInput field={form.$('phoneNumber.number')} format="+1 (###) ###-####" mask="_" />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicInput field={form.$('phoneNumber.description')} />
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <BasicFormatFieldInput field={form.$('securityPin')} format="####" mask="*" />
                                </div>
                                {/* <BasicFieldRecaptcha field={form.$('botProtection')} /> */}
                            </div>
                        </React.Fragment>}
                </React.Fragment>}

            {form.$('accountTypeId').value &&
                <React.Fragment>
                    <div className="f-row card card--sml card--primary">
                        <div className="form__group f-col f-col-lrg-12">
                            <h5>Settings</h5>
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('lineOfCredit')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicCheckBox field={form.$('initialContribution')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('contributionMinimumInitial')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('contributionMinimumAdditional')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('grantMinimumAmount')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('grantFee')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('certificateDeduction')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('certificateFee')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('extraBookletPercentage')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('blankBookletMax')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('notificationLimitRemainderAmount')} />
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            {deliveryMethodTypeDropdownStore &&
                                <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />}
                        </div>
                    </div>
                    <div className="f-row card card--sml card--primary">
                        <div className="form__group f-col f-col-lrg-12">
                            <h5>Login</h5>
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <BasicInput field={form.$('coreUser.userName')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <BasicCheckBox field={form.$('sendWelcomeEmail')} />
                            {form.$('sendWelcomeEmail').value &&
                                <span>
                                    <span className='icomoon medium icon-cog' data-tip='sendWelcomeEmail' />
                                    <ReactTooltip type='info' effect='solid'>
                                        {form.$('emailAddress.email').value && form.$('emailAddress.email').isValid ?
                                            <span>Verification Email Will Be Sent On {form.$('emailAddress.email').value}</span> :
                                            <span>Please Add An Email Address</span>}
                                    </ReactTooltip>
                                </span>}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <BasicCheckBox field={form.$('isApproved')} />
                        </div>
                    </div>
                </React.Fragment>}
        </EditFormLayout >
    );
}

export default defaultTemplate(DonorAccountCreateTemplate);
