import React from 'react';
import { defaultTemplate, renderIf, isSome } from 'core/utils';
import { BaasicFieldAsyncDropdown, BasicInput } from 'core/components';
import { EditFormLayout } from 'core/layouts';

function FundTransferCreateTemplate({ fundTransferCreateViewStore }) {
    const {
        senderDonorAccountDropdownStore,
        senderDonorAccount,
        recepientDonorAccountDropdownStore,
        recepientDonorAccount,
        form,
        loading
    } = fundTransferCreateViewStore;

    return (
        <EditFormLayout form={form} isEdit={true} loading={loading}>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    {renderIf(isSome(senderDonorAccountDropdownStore))(
                        <BaasicFieldAsyncDropdown field={form.$('senderDonorAccountId')} store={senderDonorAccountDropdownStore} />)}
                </div>
                <div className="form__group f-col f-col-lrg-6 spc--top--med">
                    {senderDonorAccount &&
                        <div>
                            {senderDonorAccount.coreUser.firstName}
                            ${senderDonorAccount.availableBalance}
                        </div>}
                </div>
            </div>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    {renderIf(isSome(senderDonorAccountDropdownStore))(
                        <BaasicFieldAsyncDropdown field={form.$('recepientDonorAccountId')} store={recepientDonorAccountDropdownStore} />)}
                </div>
                <div className="form__group f-col f-col-lrg-6 spc--top--med">
                    {recepientDonorAccount &&
                        <div>
                            <div>
                                {recepientDonorAccount.coreUser.firstName}
                            </div>
                            <div>
                                ${recepientDonorAccount.availableBalance}
                            </div>
                        </div>}
                </div>
            </div>

            {form.$('senderDonorAccountId').value && form.$('recepientDonorAccountId').value &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('amount')} />
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <BasicInput field={form.$('description')} />
                    </div>
                </div>}
        </EditFormLayout>
    );
}

export default defaultTemplate(FundTransferCreateTemplate);
