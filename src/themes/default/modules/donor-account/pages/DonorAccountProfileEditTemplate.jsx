import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, EditFormContent, BaasicFormControls } from 'core/components';

function DonorAccountProfileEditTemplate({ donorAccountProfileEditViewStore }) {
    const {
        form,
        loading,
        deliveryMethodTypeDropdownStore,
        prefixTypeDropdownStore,
    } = donorAccountProfileEditViewStore;

    return (
        <React.Fragment>
            <EditFormContent form={form} isEdit={true} loading={loading}>
                <h3>Profile Informations</h3>

                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            {prefixTypeDropdownStore && <BaasicFieldDropdown field={form.$('coreUser.prefixTypeId')} store={prefixTypeDropdownStore} />}
                        </div>
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('coreUser.firstName')} />
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('coreUser.middleName')} />
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
                            {deliveryMethodTypeDropdownStore && <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />}
                        </div>
                    </div>
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </EditFormContent >
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountProfileEditTemplate);
