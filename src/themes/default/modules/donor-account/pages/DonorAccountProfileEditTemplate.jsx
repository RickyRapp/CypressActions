import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicDropdown, BaasicButton, EditFormContent, BaasicFormControls, BasicCheckBox } from 'core/components';

function DonorAccountProfileEditTemplate({ profileEditViewStore }) {
    const {
        form,
        loading,
        deliveryMethodTypeMultiSelectStore,
        prefixTypeMultiSelectStore,
    } = profileEditViewStore;

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

                {form.changed && //checky why form.isDirty not working and fix changed dropdowns
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
            </EditFormContent >
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountProfileEditTemplate);
