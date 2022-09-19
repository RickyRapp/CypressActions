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
import { CharityPlaid } from 'application/charity/charity/components';

const CharityBankAccountEditTemplate = function ({ charityBankAccountEditViewStore, editId }) {
	const {
		form,
		imageUploadStore,
		deleteBankAccount,
		bankAccountCount,
		title,
		item,
		onCancelEditClick,
		exportFile,
		fileError,
		charityMedia,
		isImage,
		changeBankAccountId
	} = charityBankAccountEditViewStore;

	changeBankAccountId(editId);

	return (
		<EditFormContent form={form} formClassName={" "}>
			
			<div className="u-mar--top--xlrg">
				<div>
					{!item && <span className='u-display--b u-mar--bottom--sml'>Create new bank account manually or using : </span>}
					<div className="btn--plaid btn--plaid--outline u-mar--bottom--sml">
						<CharityPlaid
							entityType={"charity"}
							bankAccount={item}
						/>
					</div>
				</div>

				<h3 className="type--med type--wgt--medium type--color--opaque u-mar--bottom--med">{title}</h3>
				<div className="row row--form">

					<div className="form__group col col-sml-12 col-lrg-6">
						<BasicInput field={form.$('accountNumber')} disabled={item != null && (item && item.isVerifiedByPlaid)} />
					</div>
					<div className="form__group col col-sml-12 col-lrg-6">
						<NumberFormatInputField field={form.$('routingNumber')} disabled={item != null && (item && item.isVerifiedByPlaid)} />
					</div>
					<div className="form__group col col-sml-12 col-lrg-6">
						<BasicInput field={form.$('name')} />
					</div>
					
				</div>

				<div className="row row--form">
					<div className="form__group col col-sml-12 col-lrg-4">
						<div className="u-display--flex">
							<div>
								{bankAccountCount > 0 ? <span><label className="form__group__label u-mar--right--med">Primary account?</label>
									<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isPrimary')} /></span> : null}
							</div>
							<div >
								{bankAccountCount > 0 ? <span><label className="form__group__label u-mar--right--med">Is disabled?</label>
									<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isDisabled')} disabled={item != null && (item && item.isPrimary)} /></span> : null}
							</div>
						</div>
					</div>

				</div>
				<div className="row">
					<div className="col col-sml-12 col-lrg-8">
						<BaasicDropzone
							store={imageUploadStore}
						/>
						<p className="validation__message">{fileError}</p>
					</div>
					{
						charityMedia ? ( 
							charityMedia && ( 
								(isImage) ? 
									(
										<div className="col col-sml-12 col-lrg-4">
											<p className="form__group__label">Bank Document</p>

											<div className="card--image card--med u-mar--bottom--sml type--center"> 
												<img className="k-upload__image--original" alt="" src={URL.createObjectURL(charityMedia)} />
											</div>
										</div>
									)
									: ( 
										<div className="col col-sml-12 col-lrg-4">
											<p className="form__group__label">Download PDF</p>

											<div className="card--image card--med u-mar--bottom--sml type--center"> 
												<BaasicButton
													className='btn btn--med btn--med--wide btn--secondary btn--icon--pdf'
													label='Download'
													onClick={() => exportFile()}
												/>
											</div>
										</div>
									))
						) : null
					}
				</div>
			</div>

			<div className="info-card--footer">
				<BaasicButton
					type='button'
					className="btn btn--med btn--med--wide btn--ghost"
					onClick={onCancelEditClick}
					label='Cancel'
				/>

				{item != null &&
					<BaasicButton className='btn btn--med btn--warning u-mar--left--sml' label="BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT" onClick={() => deleteBankAccount()} >
						{/* {t('BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT')} */}
					</BaasicButton>
				}

				<span>
					<BaasicFormControls form={form} onSubmit={form.onSubmit} />
				</span>
			</div>
		</EditFormContent>
	);
};

CharityBankAccountEditTemplate.propTypes = {
	charityBankAccountEditViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityBankAccountEditTemplate);
