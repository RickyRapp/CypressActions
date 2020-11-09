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
        senderDonorDropdownStore,
        recipientDonorDropdownStore,
        onChangeAmount,
        senderDonor,
        recipientDonor,
        setErrorInsuficientFunds
    } = fundTransferCreateViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={fundTransferCreateViewStore}>
                <Content loading={contentLoading} >
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('senderDonorId')} store={senderDonorDropdownStore} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('recipientDonorId')} store={recipientDonorDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                {senderDonor &&
                                    <React.Fragment>
                                        <span className="type--base type--wgt--medium">{senderDonor.donorName}: <span className="type--color--success">${senderDonor.presentBalance}</span></span>
                                        {setErrorInsuficientFunds &&
                                            <div className="type--med type--color--warning u-mar--top--tny">{t('FUND_TRANSFER.CREATE.INSUFICIENT_FUNDS_MESSAGE')}</div>}
                                    </React.Fragment>}
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                {recipientDonor &&
                                    <span className="type--base type--wgt--medium">{recipientDonor.donorName}: <span className="type--color--success">${recipientDonor.presentBalance}</span></span>}
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
