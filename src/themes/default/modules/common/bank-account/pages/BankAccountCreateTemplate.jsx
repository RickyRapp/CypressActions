import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls } from 'core/components';
import { BankAccountTemplate } from 'themes/modules/common/bank-account/components';

function BankAccountCreateTemplate({ bankAccountEditViewStore, title }) {
    const {
        form,
        loaderStore,
    } = bankAccountEditViewStore;

    return (
        <EditFormContent form={form} loading={loaderStore.loading}>
            <div className="f-row">
                <BankAccountTemplate form={form} title={title} />

                <div className="form__group f-col f-col-lrg-12">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(BankAccountCreateTemplate);
