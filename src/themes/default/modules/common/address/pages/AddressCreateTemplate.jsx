import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls } from 'core/components';
import { AddressTemplate } from 'themes/modules/common/address/components';

function AddressCreateTemplate({ addressCreateViewStore, title, children }) {
    const {
        form,
        loaderStore,
    } = addressCreateViewStore;

    return (
        <EditFormContent form={form} loading={loaderStore.loading}>
            <div className="f-row">
                <AddressTemplate field={form} title={title} />

                {children &&
                    <div className="form__group f-col f-col-lrg-4">
                        {children}
                    </div>}

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(AddressCreateTemplate);
