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
	BasicFieldCheckbox,
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const CharityBankAccountEditTemplate = function({ charityBankAccountViewStore, t }) {
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
		item,
	} = charityBankAccountViewStore;

	return (
		<React.Fragment>
			<EditFormContent form={form}>
				<div className="card--primary__header">
					<h3 className="type--med type--wgt--medium u-mar--bottom--med">
						{id ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')} &nbsp;{' '}
						{id ? <a onClick={resetBankAccount}>(New account?)</a> : null}
					</h3>
				</div>
				
				{/* <h3 className="type--med type--wgt--medium u-mar--bottom--med">{id ? <a onClick={resetBankAccount}>New account?</a> : null }</h3> */}
				<div className="card--primary__body">
					<div className="row">
						{bankAccountDropdownStore.length > 1 || bankAccountDropdownStore.originalItems.length > 1 ? (
							<div className="col-lrg-12">
								<div className="form__group col col-sml-12 col-lrg-8">
									<BaasicFieldDropdown field={form.$('donorBankAccountId')} store={bankAccountDropdownStore} />
								</div>
								<div className="form__group col col-sml-12 col-lrg-6">
									<button className="btn btn--med btn--secondary u-mar--right--sml" onClick={selectCharity}>
										Select Bank Account
									</button>
									<button
										className="btn btn--med btn--ghost"
										onClick={resetBankAccount}
										disabled={!id}
									>
										Reset
									</button>
								</div>

								<div>
									{verifiedByPlaid != null &&
										(verifiedByPlaid === true ? (
											<div className='u-display--flex u-display--flex--align--center'>
												<i className="u-icon u-icon--approve u-icon--base u-mar--top--nano u-mar--right--tny"></i> Account verified by Plaid
											</div>
										) : (
											<BaasicButton
												className="btn btn--med btn--ghost search__wrapper__item"
												label="BANK_ACCOUNT.EDIT.BUTTON.VERIFY_BANK_ACCOUNT"
												onClick={() => verifyBankAccount()}
											></BaasicButton>
										))}
								</div>
							</div>
						) : (
							<div className="col col-lrg-12 u-mar--bottom--med">
								{verifiedByPlaid != null &&
									(verifiedByPlaid === true ? (
										<div className='u-display--flex u-display--flex--align--center'>
											<i className="u-icon u-icon--approve u-icon--base u-mar--top--nano u-mar--right--tny"></i> Account verified by Plaid
										</div>
									) : (
										<BaasicButton
											className="btn btn--med btn--ghost search__wrapper__item"
											label="BANK_ACCOUNT.EDIT.BUTTON.VERIFY_BANK_ACCOUNT"
											onClick={() => verifyBankAccount()}
										></BaasicButton>
									))}
							</div>
						)}

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

					<div className="u-display--flex u-mar--bottom--med">
						<div>
							<label className="form__group__label u-mar--right--med">Primary account?</label>
							<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isPrimary')} />
						</div>
						<div>
							<label className="form__group__label u-mar--right--med">Is disabled?</label>
							<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isDisabled')} />
						</div>
					</div>

					<div className="row u-mar--bottom--med">
						<div className="col col-sml-12 col-lrg-8">
							<BaasicDropzone store={imageUploadStore} />
						</div>
						{item
							? item.charityMedia &&
							(item.isImage ? (
								<div className="col col-sml-12 col-lrg-4">
									<p className="form__group__label">Bank Document</p>

									<div className="card--image card--med u-mar--bottom--sml type--center"> 
										<img className="k-upload__image--original" alt="" src={URL.createObjectURL(item.charityMedia)} />
									</div>
								</div>
							) : (
								<div className="col col-sml-12 col-lrg-4">
									<p className="form__group__label">Download PDF</p>

									<div className="card--image card--med u-mar--bottom--sml type--center"> 
										<BaasicButton
											className="btn btn--med btn--med--wide btn--ghost btn--icon--pdf"
											label="Download"
											onClick={() => exportFile()}
										/>
									</div>
								</div>
							))
							: null}
					</div>
				</div>

				<div className="card--primary__footer">
					<BaasicButton
						className="btn btn--med btn--ghost--warning"
						label="BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT"
						onClick={() => deleteBankAccount()}
						disabled={!id}
					>
						{/* {t('BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT')} */}
					</BaasicButton>
						
					<BaasicFormControls form={form} onSubmit={form.onSubmit} />
				</div>
			</EditFormContent>
		</React.Fragment>
	);
};

CharityBankAccountEditTemplate.propTypes = {
	charityBankAccountViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
	getBankAccounts: PropTypes.func,
};

export default defaultTemplate(CharityBankAccountEditTemplate);
