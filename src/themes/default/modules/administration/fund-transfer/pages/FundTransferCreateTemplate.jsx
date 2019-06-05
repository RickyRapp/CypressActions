import React from 'react';
import { defaultTemplate, renderIf, isSome } from 'core/utils';
import { BaasicFieldAsyncDropdown, BasicInput } from 'core/components';
import { EditFormLayout } from 'core/layouts';
import NumberFormat from 'react-number-format';

function FundTransferCreateTemplate({ fundTransferCreateViewStore }) {
    const {
        senderDonorAccountDropdownStore,
        senderDonorAccount,
        recipientDonorAccountDropdownStore,
        recipientDonorAccount,
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
                            <div>
                                {senderDonorAccount.coreUser.firstName}
                            </div>
                            <div>
                                <NumberFormat value={senderDonorAccount.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </div>
                        </div>}
                </div>
            </div>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    {renderIf(isSome(senderDonorAccountDropdownStore))(
                        <BaasicFieldAsyncDropdown field={form.$('recipientDonorAccountId')} store={recipientDonorAccountDropdownStore} />)}
                </div>
                <div className="form__group f-col f-col-lrg-6 spc--top--med">
                    {recipientDonorAccount &&
                        <div>
                            <div>
                                {recipientDonorAccount.coreUser.firstName}
                            </div>
                            <div>
                                <NumberFormat value={recipientDonorAccount.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </div>
                        </div>}
                </div>
            </div>

            {form.$('senderDonorAccountId').value && form.$('recipientDonorAccountId').value &&
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
