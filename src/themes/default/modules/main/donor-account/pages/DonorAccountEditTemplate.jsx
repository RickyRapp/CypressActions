import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, EditFormContent, BaasicFormControls } from 'core/components';
import { NonMemberTemplate } from 'themes/modules/common/non-member/components';
import { DonorAccountSettingsTemplate } from 'themes/modules/main/donor-account/components';

function DonorAccountEditTemplate({ donorAccountEditViewStore }) {
    const {
        form,
        loading,
        prefixTypeDropdownStore,
        donorAccountType,
        deliveryMethodTypeDropdownStore,
        premiumId
    } = donorAccountEditViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormContent form={form} isEdit={true} loading={loading}>
                    <div className="f-row">
                        {form.$('isCompany').value &&
                            <React.Fragment>
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
                            </React.Fragment>}

                        {form.$('isCompany').value === false &&
                            <React.Fragment>
                                <div className="form__group f-col f-col-lrg-12">
                                    <h5>Profile - {donorAccountType ? donorAccountType.name : ''}</h5>
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
                            </React.Fragment>}

                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('fundName')} />
                        </div>

                        {form.$('isCompany').value &&
                            <React.Fragment>
                                <NonMemberTemplate form={form.$('companyProfile.contactPerson')} title="Contact Informations" />
                            </React.Fragment>}

                        <DonorAccountSettingsTemplate
                            form={form}
                            title="Account Settings"
                            deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
                            premiumId={premiumId}
                            columns={4}
                        />
                    </div>
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </EditFormContent>}
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountEditTemplate);
