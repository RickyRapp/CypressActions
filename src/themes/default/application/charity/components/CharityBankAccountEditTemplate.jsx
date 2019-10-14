import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const CharityBankAccountEditTemplate = function ({ charityBankAccountEditViewStore, t }) {
    const {
        form,
        uploadTypes,
        uploadLoading,
        image,
        onAttachmentDrop
    } = charityBankAccountEditViewStore;

    return (
        <div className="card--form card--primary card--med">
            <EditFormContent form={form}>
                <h3 className="u-mar--bottom--med">{form.$('id').value ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-sml-13 col-lrg-3">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('description')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('accountNumber')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('routingNumber')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('accountHolder').$('name')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('accountHolder').$('address.addressLine1')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('accountHolder').$('address').$('addressLine2')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-3">
                        <BasicInput field={form.$('accountHolder').$('address').$('city')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-3">
                        <BasicInput field={form.$('accountHolder').$('address').$('state')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-3">
                        <BasicInput field={form.$('accountHolder').$('address').$('zipCode')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-3">
                        <BasicInput field={form.$('accountHolder').$('emailAddress').$('email')} />
                    </div>
                    <div className="col col-sml-12 col-lrg-3">
                        <div className="card card--form card--primary card--med u-mar--bottom--med">
                            <label className="form__group__label" >Bank account image</label>

                            <div className="buildings__item__img" style={{ backgroundImage: `url(${image ? image : require('themes/assets/img/building-default.svg')})`, }}></div>

                            <BaasicDropzone
                                acceptFiles={uploadTypes}
                                loading={uploadLoading}
                                onFilesDrop={onAttachmentDrop}
                                multiple={false}
                            />
                        </div>
                    </div>
                </div>

                {renderEditLayoutFooterContent({ form })}
            </EditFormContent>
        </div>
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

export default defaultTemplate(CharityBankAccountEditTemplate);
