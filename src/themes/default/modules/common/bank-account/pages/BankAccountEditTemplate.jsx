import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls, BasicCheckBox } from 'core/components';
import { BankAccountTemplate } from 'themes/modules/common/bank-account/components';

function BankAccountEditTemplate({ bankAccountEditViewStore, title, children }) {
    const {
        form,
        loaderStore,
        imgPreview
    } = bankAccountEditViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormContent form={form} loading={loaderStore.loading}>
                    <div className="f-row">
                        <BankAccountTemplate form={form} title={title} imgPreview={imgPreview} />

                        <div className="form__group f-col f-col-lrg-12">
                            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                        </div>
                    </div>
                </EditFormContent>}
        </React.Fragment>
    );
}

export default defaultTemplate(BankAccountEditTemplate);
