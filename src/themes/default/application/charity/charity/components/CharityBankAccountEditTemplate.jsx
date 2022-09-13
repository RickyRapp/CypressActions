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

const CharityBankAccountEditTemplate = function ({ charityBankAccountEditViewStore }) {
	const {
		form,
		imageUploadStore,
		deleteBankAccount,
		bankAccountCount,
		title,
		item,
		onCancelEditClick,
		exportFile,
		fileError
	} = charityBankAccountEditViewStore;

	return (
		<EditFormContent form={form} formClassName={" "}>
			<div className="card--med card--primary">
				<div>
					{!item && <span>Create new bank account manually or using : </span>}
					<div className="u-mar--bottom--sml w--100--to-med">
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
						<BasicInput field={form.$('routingNumber')} disabled={item != null && (item && item.isVerifiedByPlaid)} />
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
				<div className="row row__align--end">
					<BaasicDropzone
						store={imageUploadStore}
					/>
					<p className="validation__message">{fileError}</p>
					{
						item ? (
							item.charityMedia && (
								(item.isImage) ?
									(
										<div className="imageheight_sml">
											<img alt="" src={URL.createObjectURL(item.charityMedia)} />
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
			</div>

			<div className="info-card--footer">
				<BaasicButton
					type='button'
					className="btn btn--med btn--med--wide btn--ghost"
					onClick={onCancelEditClick}
					label='Cancel'
				/>

				<BaasicFormControls form={form} onSubmit={form.onSubmit} />

				{item != null &&
					<BaasicButton className='btn btn--med btn--ghost' label="BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT" onClick={() => deleteBankAccount()} >
						{/* {t('BANK_ACCOUNT.EDIT.BUTTON.DELETE_BANK_ACCOUNT')} */}
					</BaasicButton>
				}

			</div>
		</EditFormContent>
	);
};

CharityBankAccountEditTemplate.propTypes = {
	charityBankAccountEditViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityBankAccountEditTemplate);
