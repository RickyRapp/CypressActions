import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFormControls,
    NumberFormatInputField,
    BasicFieldCheckbox, BaasicButton, BaasicFieldDropzone
} from 'core/components';

function DonorBankAccountEditTemplate({ donorBankAccountEditViewStore, t }) {
    const {
        form,
        onBlurRoutingNumber,
        useDonorContactInformations,
        imageUploadStore,
        id
    } = donorBankAccountEditViewStore;

    return (
        <section >
            <form className='form' onSubmit={form.onSubmit}>
                <h3 className=" u-mar--bottom--med">{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}</h3>
                <div className="row row--form">
                    <div className="form__group col col-sml-12 col-lrg-6">
                        <BasicInput field={form.$('accountNumber')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6">
                        <NumberFormatInputField field={form.$('routingNumber')} onBlur={onBlurRoutingNumber} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6">
                        <BasicInput field={form.$('name')} />
                    </div>
                </div>

                <div className="row row--form">
                    <div className="form__group col col-sml-12">
                        <BasicFieldCheckbox field={form.$('isThirdPartyAccount')} />
                    </div>
                </div>

                {form.$('isThirdPartyAccount').value &&
                    <React.Fragment>
                        <div className="row row--form">
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
                            <div className="form__group col col-sml-4 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('address')}
                                    className='btn btn--sml btn--tertiary u-mar--top--med'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_ADDRESS"
                                />
                            </div>
                        </div>

                        <div className="row row--form">
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <BasicInput field={form.$('email')} />
                            </div>
                            <div className="form__group col col-sml-4 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('emailAddress')}
                                    className='btn btn--sml btn--tertiary u-mar--top--med'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_EMAIL_ADDRESS"
                                />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <NumberFormatInputField field={form.$('number')} />
                            </div>
                            <div className="form__group col col-sml-4 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('phoneNumber')}
                                    className='btn btn--sml btn--tertiary u-mar--top--med'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_PHONE_NUMBER"
                                />
                            </div>
                        </div>
                    </React.Fragment>}

                <div className="row u-mar--bottom--med">
                    <BaasicFieldDropzone store={imageUploadStore} field={form.$('coreMediaVaultEntryId')} />
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </form>
        </section>
    );
}

DonorBankAccountEditTemplate.propTypes = {
    donorBankAccountEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorBankAccountEditTemplate);