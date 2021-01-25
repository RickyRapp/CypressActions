import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFormControls,
    NumberFormatInputField,
    BasicFieldCheckbox, BaasicButton, BaasicFieldDropzone, EditFormContent
} from 'core/components';

function DonorBankAccountEditTemplate({ donorBankAccountEditViewStore, t }) {
    const {
        title,
        form,
        onCancelEditClick,
        onBlurRoutingNumber,
        useDonorContactInformations
    } = donorBankAccountEditViewStore;

    return (
        <EditFormContent form={form} >
            <div className="card--med card--primary">
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{title}</h3>
                <div className="row u-mar--bottom--sml">
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <NumberFormatInputField field={form.$('routingNumber')} onBlur={onBlurRoutingNumber} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('accountNumber')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('description')} />
                    </div>
                </div>

                <div className="row">
                    <div className="form__group col col-sml-12">
                        <BasicFieldCheckbox field={form.$('isThirdPartyAccount')} />
                    </div>
                </div>

                {form.$('isThirdPartyAccount').value &&
                    <React.Fragment>
                        <div className="row row__align--end">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicInput field={form.$('accountHolderName')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-6">
                                <BasicInput field={form.$('addressLine1')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-6">
                                <BasicInput field={form.$('addressLine2')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3">
                                <BasicInput field={form.$('city')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3">
                                <BasicInput field={form.$('state')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <BasicInput field={form.$('zipCode')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('address')}
                                    className='btn btn--100 btn--tertiary'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_ADDRESS"
                                />
                            </div>
                        </div>

                        <div className="row row__align--end">
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <BasicInput field={form.$('email')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('emailAddress')}
                                    className='btn btn--100 btn--tertiary'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_EMAIL_ADDRESS"
                                />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <NumberFormatInputField field={form.$('number')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('phoneNumber')}
                                    className='btn btn--100 btn--tertiary'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_PHONE_NUMBER"
                                />
                            </div>
                        </div>
                    </React.Fragment>}
            </div>

            <BaasicFormControls
                form={form}
                onSubmit={form.onSubmit}
                className="btn btn--base btn--secondary u-push" />
            <BaasicButton
                type='button'
                className="btn btn--base btn--tertiary u-push"
                onClick={onCancelEditClick}
                label='Cancel'
            />
        </EditFormContent>
    );
}

DonorBankAccountEditTemplate.propTypes = {
    donorBankAccountEditViewStore: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(DonorBankAccountEditTemplate);
