import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone,
    NumberFormatInputField,
    BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isNullOrUndefinedOrEmpty } from 'core/utils';

const CharityBankAccountEditTemplate = function ({ charityBankAccountViewStore, t }) {
    const {
        form,
        imageUploadStore,
        id
    } = charityBankAccountViewStore;

    return (
        <EditFormContent form={form}>
            <h3 className="u-mar--bottom--med">{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-6">
                    <BasicInput field={form.$('routingNumber')} />
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
            </div>

            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-4">
                    <BasicInput field={form.$('email')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
                    <NumberFormatInputField field={form.$('number')} />
                </div>
            </div>

            <div className="row">
                <div className="col col-sml-12 col-lrg-12">
                    <BaasicDropzone store={imageUploadStore} disabled={!isNullOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                </div>
            </div>

            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent >
    )
};

CharityBankAccountEditTemplate.propTypes = {
    charityBankAccountViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityBankAccountEditTemplate);
