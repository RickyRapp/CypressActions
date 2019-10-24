import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    NumericInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const FundTransferCreateTemplate = function ({ fundTransferCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        senderDonorAccountDropdownStore,
        recipientDonorAccountDropdownStore,
        onChangeAmount,
        senderDonorAccount,
        recipientDonorAccount,
        setErrorInsuficientFunds
    } = fundTransferCreateViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={fundTransferCreateViewStore}>
                <Content loading={contentLoading} >
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('senderDonorAccountId')} store={senderDonorAccountDropdownStore} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('recipientDonorAccountId')} store={recipientDonorAccountDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                {senderDonorAccount &&
                                    <React.Fragment>
                                        <span>{senderDonorAccount.donorName}: ${senderDonorAccount.presentBalance}</span>
                                        {setErrorInsuficientFunds &&
                                            <div className="type--med type--color--error u-mar--top--tny">{t('FUND_TRANSFER.CREATE.INSUFICIENT_FUNDS_MESSAGE')}</div>}
                                    </React.Fragment>}
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                {recipientDonorAccount &&
                                    <span>{recipientDonorAccount.donorName}: ${recipientDonorAccount.presentBalance}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputField field={form.$('amount')} onChange={onChangeAmount} />
                            </div>
                        </div>
                    </div>
                </Content>
            </ApplicationEditLayout >
        </React.Fragment>
    )
};

FundTransferCreateTemplate.propTypes = {
    fundTransferCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

export default defaultTemplate(FundTransferCreateTemplate);
