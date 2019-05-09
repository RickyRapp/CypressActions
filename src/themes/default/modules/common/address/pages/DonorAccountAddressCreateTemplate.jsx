import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls } from 'core/components';
import { AddressTemplate } from 'themes/modules/common/address/components';

function DonorAccountAddressCreateTemplate({ donorAccountAddressCreateViewStore, title }) {
    const {
        form,
        loading,
    } = donorAccountAddressCreateViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <div className="f-row">
                <AddressTemplate field={form} title={title} />
            </div>

            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    );
}

export default defaultTemplate(DonorAccountAddressCreateTemplate);
