import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes } from 'mobx-react'
import {
    BaasicFormControls,
    BasicInput,
    BaasicButton,
    BasicFieldCheckbox,
    BaasicDropzone,
    NumberFormatInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isNullOrUndefinedOrEmpty } from 'core/utils';

class DonorBankAccountEditForm extends Component {
    render() {
        const {
            formBankAccount,
            useDonorContactInformations,
            imageUploadStore,
            onBlurRoutingNumber,
        } = this.props.modalParams.data;

        const {
            t
        } = this.props

        return (
            <section >
                <form className='form' onSubmit={formBankAccount.onSubmit}>
                    <h3 className="u-mar--bottom--med">{formBankAccount.$('id').value ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <NumberFormatInputField field={formBankAccount.$('routingNumber')} onBlur={onBlurRoutingNumber} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('name')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('accountNumber')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('description')} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-12">
                            <BasicInput field={formBankAccount.$('accountHolderName')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('addressLine1')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('addressLine2')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('city')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('state')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('zipCode')} />
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
                            <BasicInput field={formBankAccount.$('email')} />
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
                            <NumberFormatInputField field={formBankAccount.$('number')} />
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
                            <BasicFieldCheckbox field={formBankAccount.$('isThirdPartyAccount')} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <BaasicDropzone store={imageUploadStore} disabled={!isNullOrUndefinedOrEmpty(formBankAccount.$('coreMediaVaultEntryId').value)} />
                        </div>
                    </div>

                    <BaasicFormControls form={formBankAccount} onSubmit={formBankAccount.onSubmit} />
                </form>
            </section>
        );
    }
}

DonorBankAccountEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired
};

export default defaultTemplate(DonorBankAccountEditForm);
