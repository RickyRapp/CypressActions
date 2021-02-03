import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import {
	BaasicButton,
	BaasicFieldDropdown,
	BaasicModal,
	BasicFieldCheckbox,
	BasicInput,
	EditFormContent,
	FormatterResolver,
	NumericInputField,
	SimpleBaasicTable,
} from 'core/components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { DonorBankAccountEdit } from 'application/donor/donor/components';
import { ContributionConfirmTemplate } from 'themes/application/donor/contribution/components';
import { ContributionCreateStep1Template, ContributionCreateStep3Template } from 'themes/application/common/contribution/components';

const ContributionCreateTemplate = function ({ contributionCreateViewStore, t }) {
	const {
		loaderStore,
		form,
		routes,
		paymentTypes,
		nextStep,
		step,
		onSelectPaymentType,
		bankAccountDropdownStore,
		bankAccountModal,
		onAddBankAccountClick,
		onSubmitClick,
		confirmModal,
		previousContributionsTableStore,
		brokerageInstitutionDropdownStore,
		securityTypeDropdownStore,
		businessTypeDropdownStore,
		propertyTypeDropdownStore,
		collectibleTypeDropdownStore,
		isThirdPartyFundingAvailable,
	} = contributionCreateViewStore;

	let paymentType = {};
	if (!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value)) {
		paymentType = paymentTypes.find(c => c.id === form.$('paymentTypeId').value);
	}

	const AddButton = () => (
		<BaasicButton
			className="btn btn--tny btn--primary u-mar--bottom--tny"
			label="CONTRIBUTION.CREATE.ADD_BANK_ACCOUNT"
			onClick={onAddBankAccountClick}
		></BaasicButton>
	);

	return (
		<Page loading={loaderStore.loading}>
			{step === 1 &&
				<ContributionCreateStep1Template
					paymentTypes={paymentTypes}
					paymentTypeId={form.$('paymentTypeId').value}
					onSelectPaymentType={onSelectPaymentType}
					step={step} />}

			{step === 2 && !isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && (
				<div className="row">
					<div className="col col-sml-12">
						<div className="row">
							<div className="col col-sml-12 col-lrg-4 col-xlrg-3">
								<button className="btn btn--link btn--med card--contribution--back" onClick={() => nextStep(step - 1)}>
									Overview
								</button>
							</div>
						</div>
					</div>
					<div className="col col-sml-12 col-lrg-4 col-xxlrg-3">
						{paymentTypes.map((c, index) => {
							return (
								<div
									key={c.id}
									className="row"
									onClick={() => c.id !== form.$('paymentTypeId').value && onSelectPaymentType(c.id)}
								>
									{/* {index === 0 && (
										<div className="col col-sml-12">
											<button
												className="btn btn--100 card--contribution card--contribution--back"
												onClick={() => nextStep(step - 1)}
											>
												Overview
											</button>
										</div>
									)} */}
									<div className="col col-sml-12 col-lrg-12">
										<div
											className={`card--contribution card--contribution--primary ${c.id ===
												form.$('paymentTypeId').value && 'checked'}`}
										>
											<div className="col col-sml-2">
												<i
													className={`u-icon u-icon--med u-icon--${c.abrv} ${c.id === form.$('paymentTypeId').value &&
														'checked'}`}
												></i>
											</div>
											<div className="col col-sml-10">
												<h5
													className={
														c.id !== form.$('paymentTypeId').value
															? 'type--base type--wgt--medium'
															: 'type--base type--wgt--medium type--color--note'
													}
												>
													{c.name}
												</h5>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="col col-sml-12 col-lrg-8 col-xxlrg-9">
						<div className="row">
							<div className="col col-sml-12 col-xxlrg-7 u-mar--bottom--med">
								<EditFormContent form={form}>
									<div className="card--primary card--med fullheight">
										<div className="row fullheight">
											<div className="col col-sml-12 col-lrg-12">
												<h5 className="type--med type--wgt--medium">{t('CONTRIBUTION.CREATE.FUND_YOUR_ACCOUNT')}</h5>
											</div>
											<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
												<p className="type--sml type--wgt--medium type--color--note">
													{t('CONTRIBUTION.CREATE.DONATE_SECURITIES')}
												</p>
											</div>
											{(paymentType.abrv === 'ach' || paymentType.abrv === 'wire-transfer') && (
												<React.Fragment>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BaasicFieldDropdown
															field={form.$('donorBankAccountId')}
															store={bankAccountDropdownStore}
															rightLabelComponent={AddButton}
														/>
													</div>
												</React.Fragment>
											)}
											{paymentType.abrv === 'check' && (
												<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
													<BasicInput field={form.$('checkNumber')} />
												</div>
											)}
											{paymentType.abrv === 'stock-and-securities' && (
												<React.Fragment>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BaasicFieldDropdown
															field={form.$('brokerageInstitutionId')}
															store={brokerageInstitutionDropdownStore}
														/>
													</div>
													{brokerageInstitutionDropdownStore &&
														brokerageInstitutionDropdownStore.value &&
														brokerageInstitutionDropdownStore.value.name === 'Other' && (
															<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
																<BasicInput field={form.$('other')} />
															</div>
														)}
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BaasicFieldDropdown field={form.$('securityTypeId')} store={securityTypeDropdownStore} />
													</div>
													{securityTypeDropdownStore &&
														securityTypeDropdownStore.value &&
														securityTypeDropdownStore.value.name === 'Other' && (
															<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
																<BasicInput field={form.$('other')} />
															</div>
														)}
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BasicInput field={form.$('securitySymbol')} />
													</div>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<NumericInputField field={form.$('numberOfShares')} />
													</div>
												</React.Fragment>
											)}
											{paymentType.abrv === 'business-and-private-interests' && (
												<React.Fragment>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BaasicFieldDropdown field={form.$('businessTypeId')} store={businessTypeDropdownStore} />
													</div>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BasicInput field={form.$('other')} />
													</div>
												</React.Fragment>
											)}
											{paymentType.abrv === 'real-estate' && (
												<React.Fragment>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BaasicFieldDropdown field={form.$('propertyTypeId')} store={propertyTypeDropdownStore} />
													</div>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BasicInput field={form.$('other')} />
													</div>
												</React.Fragment>
											)}
											{paymentType.abrv === 'collectible-assets' && (
												<React.Fragment>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BaasicFieldDropdown
															field={form.$('collectibleTypeId')}
															store={collectibleTypeDropdownStore}
														/>
													</div>
													{collectibleTypeDropdownStore &&
														collectibleTypeDropdownStore.value &&
														collectibleTypeDropdownStore.value.name === 'Other' && (
															<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
																<BasicInput field={form.$('other')} />
															</div>
														)}
												</React.Fragment>
											)}
											<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
												<NumericInputField field={form.$('amount')} />
											</div>
											{isThirdPartyFundingAvailable && (
												<React.Fragment>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BasicFieldCheckbox field={form.$('isThirdParty')} />
													</div>
													{form.$('isThirdParty').value && (
														<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
															<div className="row">
																<div className="form__group col col-sml-12 col-lrg-12">
																	<BasicInput field={form.$('name')} />
																</div>
																<div className="form__group col col-sml-12 col-lrg-6">
																	<BasicInput field={form.$('addressLine1')} />
																</div>
																<div className="form__group col col-sml-12 col-lrg-6">
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
																<div className="form__group col col-sml-12 col-lrg-6">
																	<BasicInput field={form.$('email')} />
																</div>
																<div className="form__group col col-sml-12 col-lrg-6">
																	<BasicInput field={form.$('number')} />
																</div>
															</div>
														</div>
													)}
												</React.Fragment>
											)}
											<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
												<BasicFieldCheckbox field={form.$('isAgreeToPoliciesAndGuidelines')} />
											</div>
											<div className="col col-sml-12 u-display--flex u-display--flex--end">
												<BaasicButton
													type="button"
													className="btn btn--med btn--med--wide btn--secondary u-push"
													onClick={onSubmitClick}
													icon={form.validating ? 'synchronize-arrows-1 rotate' : ''}
													label={'FORM_CONTROLS.SAVE_BUTTON'}
												/>
											</div>
										</div>
									</div>
									<BaasicModal modalParams={confirmModal}>
										<ContributionConfirmTemplate form={form} />
									</BaasicModal>
								</EditFormContent>
							</div>
							<div className="col col-sml-12 col-xxlrg-5 u-mar--bottom--med">
								<div className="card--primary card--med fullheight">
									<div className="u-display--flex u-display--flex--column u-display--flex--justify--space-between fullheight">
										<div>
											<h5 className="type--med type--wgt--medium u-mar--bottom--sml">
												{t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}
											</h5>
											<SimpleBaasicTable tableStore={previousContributionsTableStore} />
										</div>

										<BaasicButton
											className="btn btn--100 btn--primary u-mar--top--med"
											label="CONTRIBUTION.CREATE.ALL_CONTRIBUTIONS"
											onClick={routes.allContributions}
										></BaasicButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{step === 3 &&
				<ContributionCreateStep3Template
					paymentType={paymentTypes.find(c => c.id === form.$('paymentTypeId').value)}
					routes={routes}
					previousContributionsTableStore={previousContributionsTableStore}
					bankAccount={bankAccountDropdownStore && bankAccountDropdownStore.items.find(c => c.id === form.$('donorBankAccountId').value)}
					form={form} />}
			<BaasicModal modalParams={bankAccountModal}>
				<DonorBankAccountEdit />
			</BaasicModal>
		</Page>
	);
};

ContributionCreateTemplate.propTypes = {
	contributionCreateViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(ContributionCreateTemplate);
