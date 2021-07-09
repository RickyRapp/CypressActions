import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicFormControls, BaasicFieldDropdown, NumericInputField, BasicFieldCheckbox } from 'core/components';

const DonorToDonorTemplate = function ({ donorToDonorViewStore, t }) {
    const {
        form,
        selectDonorSenderDropdownStore,
        selectDonorRecipientDropdownStore,
        donorSenderId,
        donorRecipientId } = donorToDonorViewStore;

    return (
        <React.Fragment>
            <div className="card--tertiary card--med u-mar--bottom--sml">
                <div className="row row--form">
                    <div className="col col-sml-12 col-xxlrg-6">
                        <div className="row row--form u-mar--bottom--sml">
                            <h3 className=" u-mar--bottom--med">{'Select Donor From'}</h3>
                            <div className="form__group col col-sml-12">
                                <BaasicFieldDropdown
                                    field={form.$('donorSenderId')}
                                    store={selectDonorSenderDropdownStore}
                                    additionalLabel='Select Donor Sender'
                                />
                            </div>
                        </div>
                        {donorSenderId &&
                            <div className="row row--form u-mar--bottom--sml">
                                <h3 className=" u-mar--bottom--med">{'Select Donor To'}</h3>
                                <div className="form__group col col-sml-12">
                                    <BaasicFieldDropdown
                                        field={form.$('donorRecipientId')}
                                        store={selectDonorRecipientDropdownStore}
                                        additionalLabel='Select Donor Recipient'
                                    />
                                </div>
                            </div>}
                        {donorRecipientId &&
                            <div className="row row--form u-mar--bottom--sml">
                                <div className="col col-sml-12 col-lrg-12">
                                    <h3 className=" u-mar--bottom--med">{'Transaction amount'}</h3>
                                </div>
                                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                    <NumericInputField field={form.$('amount')} />
                                </div>
                            </div>}
                        {donorRecipientId &&
                            <div className="row row--form u-mar--bottom--lrg">
                                <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml type--color--note">
                                    <BasicFieldCheckbox field={form.$('ignoreInsufficientFunds')} />
                                </div>
                            </div>}
                        <div className="row row--form">
                            <div className="form__group col col-sml-12">
                                <BaasicFormControls form={form} onSubmit={form.onSubmit} label={'DONOR_DONOR_ADMIN.CREATE.BUTTON.TRANSACTION'} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

DonorToDonorTemplate.propTypes = {
    donorToDonorViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorToDonorTemplate);
