import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone,
    NumberFormatInputField,
    BaasicButton,
	BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

const CharityBankAccountEditTemplate = function({ charityBankAccountEditViewStore, t }) {
	const { 
		form,
		imageUploadStore,
		deleteBankAccount,
        bankAccountCount,
		title,
		onCancelEditClick
	} = charityBankAccountEditViewStore;

	return (
		<EditFormContent form={form}>
			<div className="card--med card--primary">
				<h3 className="type--med type--wgt--medium type--color--opaque u-mar--bottom--med">{title}</h3>
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
					<div className="form__group col col-sml-12 col-lrg-4">
                        {bankAccountCount > 0 ? <span><label className="form__group__label u-mar--right--med">Primary account?</label>
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isPrimary')} /></span> : null}
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
			</div>

			<div className="info-card--footer">
				<BaasicButton
                    type='button'
                    className="btn btn--med btn--med--wide btn--ghost"
                    onClick={onCancelEditClick}
                    label='Cancel'
                />
				<span className="u-mar--right--sml">
				<BaasicFormControls form={form} onSubmit={form.onSubmit} />	
				</span>
				<BaasicButton className='btn btn--med btn--ghost search__wrapper__item' label="BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT" onClick={() => deleteBankAccount()} >
                    {/* {t('BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT')} */}
                </BaasicButton>
			</div>
		</EditFormContent>
	);
};

CharityBankAccountEditTemplate.propTypes = {
	charityBankAccountEditViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityBankAccountEditTemplate);
