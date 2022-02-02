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

const CharityBankAccountEditTemplate = function({ charityBankAccountViewStore, t }) {
	const { 
		form, 
		imageUploadStore,
		id,
		deleteBankAccount,
        bankAccountDropdownStore,
		selectCharity,
        resetBankAccount 
	} = charityBankAccountViewStore;

	return (
		<EditFormContent form={form}>
			<h3 className="type--med type--wgt--medium u-mar--bottom--med">{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')} &nbsp; {id ? <a onClick={resetBankAccount}>(New account?)</a> : null }</h3>
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
            </div>
			<div className="row row--form">
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
			</div>

			<div className="row row--form u-mar--bottom--med">
				<div className="col col-sml-12 col-lrg-12">
					<div className="row row__align--end">
						<BaasicDropzone
							store={imageUploadStore}
							disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)}
						/>
					</div>
				</div>
			</div>

			<div className="type--right">
				<span className="u-mar--right--sml">
				<BaasicFormControls form={form} onSubmit={form.onSubmit} />	
				</span>

				<BaasicButton className='btn btn--med btn--ghost search__wrapper__item' label="BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT" onClick={() => deleteBankAccount()} disabled={!id}>
                    {/* {t('BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT')} */}
                </BaasicButton>
			</div>
		</EditFormContent>
	);
};

CharityBankAccountEditTemplate.propTypes = {
	charityBankAccountViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityBankAccountEditTemplate);
