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
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

const CharityBankAccountEditTemplate = function ({ charityBankAccountViewStore, t }) {
    const {
        form,
        imageUploadStore,
        id
    } = charityBankAccountViewStore;

    return (
        <EditFormContent form={form}>
            <h3 className="type--med type--wgt--medium u-mar--bottom--med">{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}</h3>
            <div className="row row--form">
                <div className="form__group col col-sml-12 col-lrg-4">
                    <BasicInput field={form.$('accountNumber')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
                    <NumberFormatInputField field={form.$('routingNumber')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
                    <BasicInput field={form.$('name')} />
                </div>
            </div>
            <div className="row row--form">
                <div className="form__group col col-sml-12 col-lrg-4">
                    <BasicInput field={form.$('email')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
                    <NumberFormatInputField field={form.$('number')} />
                </div>
            </div>
            <div className="row row--form">
                <div className="col col-sml-12 col-lrg-12">
                    <BaasicDropzone store={imageUploadStore} disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                </div>
            </div>
            <div className="type--right">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent >
    )
};

CharityBankAccountEditTemplate.propTypes = {
    charityBankAccountViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityBankAccountEditTemplate);
