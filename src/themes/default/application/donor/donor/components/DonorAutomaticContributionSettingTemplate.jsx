import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	EditFormContent,
	BaasicFormControls,
	BasicFieldCheckbox,
	BaasicFieldDropdown,
	NumericInputField,
	FormatterResolver,
	BaasicButton,
} from 'core/components';

const DonorAutomaticContributionSettingTemplate = function({ t, donorAutomaticContributionSettingViewStore }) {
	const {
		loaderStore,
		form,
		bankAccountDropdownStore,
		onEnableEditClick,
		onChangeIsEnabled,
		isEditEnabled,
		item,
	} = donorAutomaticContributionSettingViewStore;

	return (
		<React.Fragment>
			<div className="card--primary card--med u-mar--bottom--med">
				<h3 className=" u-mar--bottom--med">{t('DONOR.AUTOMATIC_CONTRIBUTION_SETTING.TITLE')}</h3>
				{isEditEnabled ? (
					<React.Fragment>
						<div>
							<div>
								<EditFormContent form={form} loading={loaderStore.loading}>
									<div className="row">
										<div className="form__group col col-sml-12">
											<div className="u-display--flex">
												<label className="form__group__label u-mar--right--med">Is enabled?</label>
												<BasicFieldCheckbox
													field={form.$('isEnabled')}
													disabled={item && item.isEnabled}
													showLabel={false}
													toggleClass="--toggle"
													onChange={onChangeIsEnabled}
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-12 col-xxlrg-6">
											<NumericInputField field={form.$('lowBalanceAmount')} disabled={item && item.isEnabled} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-12 col-xxlrg-6">
											<NumericInputField field={form.$('amount')} disabled={item && item.isEnabled} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-12 col-xxlrg-6">
											<BaasicFieldDropdown
												field={form.$('donorBankAccountId')}
												store={bankAccountDropdownStore}
												disabled={item && item.isEnabled}
											/>
										</div>
									</div>
								</EditFormContent>
							</div>
							<div className="info-card--footer">
								<BaasicButton
									type="button"
									className="btn btn--med btn--med--wide btn--ghost"
									onClick={onEnableEditClick}
									label="Cancel"
								/>
								<BaasicFormControls form={form} onSubmit={form.onSubmit} />
							</div>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className="info-card--scale">
							<div className="row" title="Click to edit" onClick={onEnableEditClick}>
								<div className="form__group col col-sml-6 col-xlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Enabled?</p>
									<p className="type--base type--wgt--bold">{item && item.isEnabled ? 'Yes' : 'No'}</p>
								</div>

								<div className="form__group col col-sml-6 col-xlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Bank Account:</p>
									<p className="type--base type--wgt--bold">
										{item && item.donorBankAccount && item.donorBankAccount.name}
									</p>
								</div>

								<div className="form__group col col-sml-6 col-xlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Amount:</p>
									<p className="type--base type--wgt--bold">
										<FormatterResolver
											item={{ amount: item && item.amount }}
											field="amount"
											format={{ type: 'currency' }}
										/>
									</p>
								</div>

								<div className="form__group col col-sml-6 col-xlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
										Low Balance Amount:
									</p>
									<p className="type--base type--wgt--bold">
										<FormatterResolver
											item={{ lowBalanceAmount: item && item.lowBalanceAmount }}
											field="lowBalanceAmount"
											format={{ type: 'currency' }}
										/>
									</p>
								</div>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};

DonorAutomaticContributionSettingTemplate.propTypes = {
	donorAutomaticContributionSettingViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorAutomaticContributionSettingTemplate);