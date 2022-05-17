import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone,
    NumberFormatInputField,
    BaasicFieldDropdown,
    BaasicButton,
    BasicFieldCheckbox
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
        verifyBankAccount,
        exportFile,
        item
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
                    <div className="form__group col col-sml-12 col-lrg-6">
                    <button className='btn btn--med' onClick={selectCharity}>
                        Select Bank Account
                    </button>
                    &nbsp;
                    <button className='btn btn--med btn--ghost search__wrapper__item' onClick={resetBankAccount} disabled={!id}>
                        Reset
                    </button>

                    { verifiedByPlaid != null && 
                    (verifiedByPlaid === true ?
                            <small>Account verified by Plaid: <i className="u-icon u-icon--approve u-icon--base"></i></small>
                         : 
                            <BaasicButton className='btn btn--med btn--ghost search__wrapper__item' label="BANK_ACCOUNT.EDIT.BUTTON.VERIFY_BANK_ACCOUNT" onClick={() => verifyBankAccount()}></BaasicButton>
                    )}

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
						<BasicInput field={form.$('accountHolderName')} />
					</div>
					<div className="form__group col col-sml-12 col-lrg-4">
						<BasicInput field={form.$('addressLine1')} />
					</div>
					<div className="form__group col col-sml-12 col-lrg-4">
						<BasicInput field={form.$('addressLine2')} />
					</div>
					<div className="form__group col col-sml-12 col-lrg-4">
						<BasicInput field={form.$('city')} />
					</div>
					<div className="form__group col col-sml-12 col-lrg-4">
						<BasicInput field={form.$('state')} />
					</div>
					<div className="form__group col col-sml-12 col-lrg-4">
						<BasicInput field={form.$('zipCode')} />
					</div>
				</div>

            <div className="row row--form">
                <div className="form__group col col-sml-12 col-lrg-4">
                    <BasicInput field={form.$('email')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
                    <NumberFormatInputField field={form.$('number')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
						<div>
							<span><label className="form__group__label u-mar--right--med">Primary account?</label>
							<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isPrimary')} /></span>
						</div>
						<div >
							<span><label className="form__group__label u-mar--right--med">Is disabled?</label>
							<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isDisabled')} /></span>
                    	</div>
                    </div>

            </div>
            <div className="row row__align--end">
							<BaasicDropzone
								store={imageUploadStore}
							/>
								{
                                    item ? (
										item.charityMedia && (
										(item.isImage) ?
										(
										<div className="imageheight_sml">
											<img alt="" src={URL.createObjectURL(item.charityMedia)}  />
										</div>
										)
										: (
											<BaasicButton
												className='btn btn--sml btn--primary'
												label='Download'
												onClick={() => exportFile()}
											/>
											))
									) : null
                                }
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
    </div>
    )
};

CharityBankAccountEditTemplate.propTypes = {
    charityBankAccountViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
    getBankAccounts: PropTypes.func
};

export default defaultTemplate(CharityBankAccountEditTemplate);
