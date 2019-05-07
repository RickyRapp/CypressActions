import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls } from 'core/components';
import { AddressTemplate } from 'themes/modules/common/address/components';

function AddressEditTemplate({ addressEditViewStore, title, children }) {
    const {
        form,
        loading,
    } = addressEditViewStore;

    return (
        <EditFormContent form={form} loading={loading}>
            <div className="f-row">
                <AddressTemplate field={form} title={title} />

                {children &&
                    <div className="form__group f-col f-col-lrg-4">
                        {children}
                    </div>}
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    );
}

export default defaultTemplate(AddressEditTemplate);
