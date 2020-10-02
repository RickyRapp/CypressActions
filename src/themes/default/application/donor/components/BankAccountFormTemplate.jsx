import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFormControls,
    NumberFormatInputField,
    BaasicDropzone, BasicFieldCheckbox, BaasicButton
} from 'core/components';
import { isNullOrUndefinedOrEmpty } from 'core/utils';

function BankAccountFormTemplate({ bankAccountFormViewStore, t }) {
    const {
        form,
        onBlurRoutingNumber,
        useDonorContactInformations,
        imageUploadStore,
        id
    } = bankAccountFormViewStore;

    return (
        <section >
            <form className='form' onSubmit={form.onSubmit}>
                <h3 className="u-mar--bottom--med">{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-sml-12 col-lrg-6">
                        <NumberFormatInputField field={form.$('routingNumber')} onBlur={onBlurRoutingNumber} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6">
                        <BasicInput field={form.$('accountNumber')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6">
                        <BasicInput field={form.$('description')} />
                    </div>
                </div>

                <div className="row">
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
                    <div className="form__group col col-sml-6 col-lrg-3">
                        <BasicInput field={form.$('zipCode')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-3">
                        <BaasicButton
                            onClick={() => useDonorContactInformations('address')}
                            className='btn btn--tny btn--secondary'
                            type='button'
                            label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_ADDRESS"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form__group col col-sml-12 col-lrg-4">
                        <BasicInput field={form.$('email')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-2">
                        <BaasicButton
                            onClick={() => useDonorContactInformations('emailAddress')}
                            className='btn btn--tny btn--secondary'
                            type='button'
                            label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_EMAIL_ADDRESS"
                        />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-4">
                        <NumberFormatInputField field={form.$('number')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-2">
                        <BaasicButton
                            onClick={() => useDonorContactInformations('phoneNumber')}
                            className='btn btn--tny btn--secondary'
                            type='button'
                            label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_PHONE_NUMBER"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form__group col col-sml-12 col-lrg-12">
                        <BasicFieldCheckbox field={form.$('isThirdPartyAccount')} />
                    </div>
                </div>

                <div className="row">
                    <div className="col col-sml-12 col-lrg-12">
                        <BaasicDropzone store={imageUploadStore} disabled={!isNullOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                    </div>
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </form>
        </section>
    );
}

BankAccountFormTemplate.propTypes = {
    bankAccountFormViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(BankAccountFormTemplate);