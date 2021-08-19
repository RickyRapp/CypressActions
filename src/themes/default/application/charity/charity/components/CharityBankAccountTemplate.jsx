import React from 'react';
import PropTypes from 'prop-types';

import {
	BasicInput,
	BaasicFormControls,
	EditFormContent,
	BaasicDropzone,
	NumberFormatInputField,
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

const CharityBankAccountEditTemplate = function({ charityBankAccountViewStore, t }) {
	const { form, imageUploadStore, id, getBankAccounts } = charityBankAccountViewStore;
	return (
		<EditFormContent form={form}>
			<h3 className="type--med type--wgt--medium u-mar--bottom--med">
				{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}
			</h3>
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
				<BaasicFormControls form={form} onSubmit={form.onSubmit} />
			</div>
			<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
				<button className='btn btn--med btn--ghost search__wrapper__item' onClick={getBankAccounts}>
				Get Bank Account
				</button>
            </div>
		</EditFormContent>
	);
};

CharityBankAccountEditTemplate.propTypes = {
	charityBankAccountViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
	getBankAccounts: PropTypes.func
};

export default defaultTemplate(CharityBankAccountEditTemplate);
