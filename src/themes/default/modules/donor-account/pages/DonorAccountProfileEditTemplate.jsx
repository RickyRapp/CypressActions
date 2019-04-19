import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, EditFormContent, BaasicFormControls, BasicFormatFieldInput } from 'core/components';

function DonorAccountProfileEditTemplate({ donorAccountProfileEditViewStore }) {
    const {
        form,
        loading,
        prefixTypeDropdownStore,
        donorAccountType
    } = donorAccountProfileEditViewStore;

    return (
        <React.Fragment>
            <EditFormContent form={form} isEdit={true} loading={loading}>
                <h3>Profile Informations - {donorAccountType ? donorAccountType.name : ''}</h3>

                {form.$('companyProfileId').value &&
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.name')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.dba')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.website')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.address.addressLine1')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.address.addressLine2')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.address.city')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.address.state')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.address.zipCode')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('companyProfile.emailAddress.email')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicFormatFieldInput field={form.$('companyProfile.phoneNumber.number')} format="+1 (###) ###-####" mask="_" />
                        </div>
                    </div>}

                {form.$('companyProfile.name').value &&
                    <h3>Main Contact</h3>}
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-4">
                        {prefixTypeDropdownStore &&
                            <BaasicFieldDropdown field={form.$('coreUser.prefixTypeId')} store={prefixTypeDropdownStore} />}
                    </div>

                    <div className="form__group f-col f-col-lrg-4">
                        <BasicInput field={form.$('coreUser.firstName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-4">
                        <BasicInput field={form.$('coreUser.middleName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-4">
                        <BasicInput field={form.$('coreUser.lastName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-4">
                        <BasicInput field={form.$('fundName')} />
                    </div>
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </EditFormContent >
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountProfileEditTemplate);
