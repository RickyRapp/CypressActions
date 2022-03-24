import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone,
    NumberFormatInputField,
    BaasicFieldDropdown,
    BaasicButton
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

const CharityBankAccountEditTemplate = function ({ charityBankAccountViewStore, t }) {
    const {
        form,
        imageUploadStore,
        id,
        deleteBankAccount,
        getBankAccounts,
        bankAccountDropdownStore,
        selectCharity,
        resetBankAccount,
        verifiedByPlaid,
    } = charityBankAccountViewStore;

    return (<div>
        <EditFormContent form={form}>
            <h3 className="type--med type--wgt--medium u-mar--bottom--med">{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')} &nbsp; {id ? <a onClick={resetBankAccount}>(New account?)</a> : null }</h3>
            {/* <h3 className="type--med type--wgt--medium u-mar--bottom--med">{id ? <a onClick={resetBankAccount}>New account?</a> : null }</h3> */}
            <div className="row row--form">
                {bankAccountDropdownStore.length > 1 || bankAccountDropdownStore.originalItems.length > 1 ? 
                <div className="col-lrg-12">
                    <div className="form__group col col-sml-12 col-lrg-8">
                        <BaasicFieldDropdown field={form.$('donorBankAccountId')} store={bankAccountDropdownStore}/>
                    </div> 
                    <div className="form__group col col-sml-12 col-lrg-4">
                    <button className='btn btn--med' onClick={selectCharity}>
                        Select Bank Account
                    </button>
                    &nbsp;
                    <button className='btn btn--med btn--ghost search__wrapper__item' onClick={resetBankAccount} disabled={!id}>
                        Reset
                    </button>
                    </div>
                </div>
                : null}
                
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
                <BaasicDropzone store={imageUploadStore} disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
            </div>
            <div className="type--right">
                <span className="u-mar--right--sml">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </span>
                
                <BaasicButton className='btn btn--med btn--ghost search__wrapper__item' label="BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT" onClick={() => deleteBankAccount()} disabled={!id}>
                    {/* {t('BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT')} */}
                </BaasicButton>
            </div>
        </EditFormContent >

        <div className="type--right">
        {
        verifiedByPlaid ?   <button className='btn btn--med btn--ghost search__wrapper__item' onClick={getBankAccounts}>
                                Get Bank Account
                            </button> 
                            : null
        }
        
        </div>
    </div>
    )
};

CharityBankAccountEditTemplate.propTypes = {
    charityBankAccountViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
    getBankAccounts: PropTypes.func
};

export default defaultTemplate(CharityBankAccountEditTemplate);
