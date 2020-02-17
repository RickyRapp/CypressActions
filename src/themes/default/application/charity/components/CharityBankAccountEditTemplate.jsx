import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone,
    NumberFormatInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const CharityBankAccountEditTemplate = function ({ charityBankAccountEditViewStore, t }) {
    const {
        form,
        uploadTypes,
        uploadLoading,
        image,
        onAttachmentDrop,
        currentImage
    } = charityBankAccountEditViewStore;

    return (
        <EditFormContent form={form}>
            <h3 className="u-mar--bottom--med">{t('CHARITY.EDIT.FIELDS.BANK_ACCOUNT_TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <BasicInput field={form.$('name')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <BasicInput field={form.$('accountNumber')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <NumberFormatInputField field={form.$('routingNumber')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3">
                    <BasicInput field={form.$('accountHolder.addressLine1')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3">
                    <BasicInput field={form.$('accountHolder.addressLine2')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-3">
                    <BasicInput field={form.$('accountHolder.city')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-3">
                    <BasicInput field={form.$('accountHolder.state')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-3">
                    <BasicInput field={form.$('accountHolder.zipCode')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-3">
                    <BasicInput field={form.$('accountHolder.email')} />
                </div>
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

            {renderEditLayoutFooterContent({ form })}
        </EditFormContent >
    )
};

CharityBankAccountEditTemplate.propTypes = {
    charityBankAccountEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderEditLayoutFooterContent({ form }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
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

export default defaultTemplate(CharityBankAccountEditTemplate);
