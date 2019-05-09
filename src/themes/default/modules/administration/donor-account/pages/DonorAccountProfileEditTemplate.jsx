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
                {form.$('companyProfileId').value &&
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <h5>Company Profile - {donorAccountType ? donorAccountType.name : ''}</h5>
                        </div>
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
                            <BasicFormatFieldInput field={form.$('companyProfile.phoneNumber.number')} format="(###) ###-####" mask="_" />
                        </div>
                    </div>}


                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        {form.$('companyProfile.name').value ?
                            <h5>Main Contact</h5>
                            :
                            <h5>Profile - {donorAccountType ? donorAccountType.name : ''}</h5>}
                    </div>
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
