import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFormControls,
    BasicInput,
    BaasicButton,
    BasicFieldCheckbox,
    BaasicDropzone,
    NumberFormatInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorAccountBankAccountEditForm extends Component {
    render() {
        const { modalParams,
            useDonorContactInformations,
            t,
            uploadTypes,
            uploadLoading,
            image,
            onAttachmentDrop,
            currentImage,
            onBlurRoutingNumber
        } = this.props;
        const { formBankAccount } = modalParams.data;

        return (
            <section className='w--600--px'>
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
                        <div className="form__group col col-sml-12 col-lrg-12">
                            <BasicFieldCheckbox field={formBankAccount.$('isThirdPartyAccount')} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('accountHolder').$('name')} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('accountHolder').$('addressLine1')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('accountHolder').$('addressLine2')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('accountHolder').$('city')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('accountHolder').$('state')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('accountHolder').$('zipCode')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BaasicButton
                                onClick={() => useDonorContactInformations(true, 'address')}
                                className='btn btn--tny btn--secondary'
                                type='button'
                                label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_ADDRESS"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <BasicInput field={formBankAccount.$('accountHolder').$('email')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <BaasicButton
                                onClick={() => useDonorContactInformations(true, 'emailAddress')}
                                className='btn btn--tny btn--secondary'
                                type='button'
                                label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_EMAIL_ADDRESS"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <NumberFormatInputField field={formBankAccount.$('accountHolder').$('number')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <BaasicButton
                                onClick={() => useDonorContactInformations(true, 'phoneNumber')}
                                className='btn btn--tny btn--secondary'
                                type='button'
                                label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_PHONE_NUMBER"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-sml-12 col-lrg-3">
                            <label className="form__group__label" >Bank account image</label>

                            {!image && currentImage && imgPreview({ image: currentImage })}

                            <BaasicDropzone
                                acceptFiles={uploadTypes}
                                loading={uploadLoading}
                                onFilesDrop={onAttachmentDrop}
                                multiple={false}
                            />

                            {image && imgPreview({ image })}
                        </div>
                    </div>

                    <BaasicFormControls form={formBankAccount} onSubmit={formBankAccount.onSubmit} />
                </form>
            </section>
        );
    }
}

DonorAccountBankAccountEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    useDonorContactInformations: PropTypes.func.isRequired,
    t: PropTypes.func,
    uploadTypes: PropTypes.array.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    image: PropTypes.string,
    onAttachmentDrop: PropTypes.func.isRequired,
    currentImage: PropTypes.string
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginTop: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function imgPreview({ image }) {
    return (
        <div style={thumb} >
            <div style={thumbInner}>
                <img
                    src={image}
                    style={img}
                />
            </div>
        </div>
    )
}

imgPreview.propTypes = {
    image: PropTypes.any
};

export default defaultTemplate(DonorAccountBankAccountEditForm);
