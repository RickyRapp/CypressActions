import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicSelect } from 'core/components';
import { EditFormLayout } from 'core/layouts';

function DonorAccountEditTemplate({ editViewStore }) {
    const { form, loading, deliveryMethodsOptions, selectedDeliveryMethodOption, onChangeDeliveryMethod } = editViewStore;

    return (
        <EditFormLayout form={form} isEdit={true} loading={loading}>
            <div className="f-row">
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
                        <label>Delivery Method Type</label>
                        <BaasicSelect classNames="input" name={form.$('deliveryMethodTypeId').name} id={form.$('deliveryMethodTypeId').id} options={deliveryMethodsOptions} value={selectedDeliveryMethodOption} onChange={onChangeDeliveryMethod} />
                    </div>
                </div>
            </div>
        </EditFormLayout >
    );
}

export default defaultTemplate(DonorAccountEditTemplate);
