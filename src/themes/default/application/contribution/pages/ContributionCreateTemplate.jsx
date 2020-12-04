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
import { BankAccountForm } from 'application/donor/components';
import { ContributionConfirmTemplate } from 'themes/application/contribution/components';
import react from 'react';

const ContributionCreateTemplate = function({ contributionCreateViewStore, t }) {
	const {
		loaderStore,
		form,
		routes,
		paymentTypes,
		step,
		onSelectPaymentType,
		bankAccountDropdownStore,
		bankAccountModal,
		onAddBankAccountClick,
		onSubmitClick,
		confirmModal,
		previousContributionsTableStore,
	} = contributionCreateViewStore;

	let paymentType = {};
	if (!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value)) {
		paymentType = paymentTypes.find(c => c.id === form.$('paymentTypeId').value);
	}

	const addButton = (
		<BaasicButton
			className="btn btn--icon"
			icon="u-icon u-icon--unlocked u-icon--sml" //TODO replace with add icon
			label="CONTRIBUTION.CREATE.ADD_BANK_ACCOUNT_LABEL"
			onlyIcon={true}
			onClick={onAddBankAccountClick}
		></BaasicButton>
	);

	return (
		<Page loading={loaderStore.loading}>
			{step === 1 &&
				<React.Fragment>
					<div className="row">
						<div className="col col-sml-3">
							<div className="card--sml type--med type--wgt--medium type--color--note type--center">Overview</div>
						</div>
						<div className="col col-sml-2">
							<div className="card--sml type--med type--wgt--medium type--color--opaque type--center">Timeline</div>
						</div>
						<div className="col col-sml-2">
							<div className="card--sml type--med type--wgt--medium type--color--opaque type--center">Deductible eligibility</div>
						</div>
						<div className="col col-sml-2">
							<div className="card--sml type--med type--wgt--medium type--color--opaque type--center">Minimum Deposit</div>
						</div>
						<div className="col col-sml-3">
							<div className="card--sml type--med type--wgt--medium type--color--opaque type--center">More</div>
						</div>
					</div>

				{paymentTypes &&
				paymentTypes.map(c => {
					let iconName = c.name
					.toLowerCase()
					.split(' ')
					.join('-');
					return (
						<div key={c.id} className="row">
							<div className="col col-sml-12 col-xxlrg-3 u-mar--bottom--med">
								<div
									className="card card--contribution card--med cursor--pointer"
									onClick={() => onSelectPaymentType(c.id)}
									>
									<div className="row row__align--center">
										<div className="col col-sml-4 col-lrg-2">
											<i
												className={`u-icon u-icon--med u-icon--${iconName} ${c.id === form.$('paymentTypeId').value &&
													'checked'}`}
													></i>
										</div>
										<div className="col col-sml-8 col-lrg-10">
											<h5 className="type--base type--color--text type--wgt--medium">{c.name}</h5>
										</div>
									</div>
								</div>
							</div>
							{step === 1 && (
								<React.Fragment>
									<div className="col col-sml-12 col-lrg-6 col-xxlrg-2">
										<div className="card card--primary card--med type--center u-mar--bottom--med">
											<p className="type--base type--color--text type--wgt--regular">2-3 Business days</p>
										</div>
									</div>
									<div className="col col-sml-12 col-lrg-6 col-xxlrg-2">
										<div className="card card--primary card--med type--center u-mar--bottom--med">
											<p className="type--base type--color--text type--wgt--regular">60%</p>
										</div>
									</div>
									<div className="col col-sml-12 col-lrg-6 col-xxlrg-2">
										<div className="card card--primary card--med type--center u-mar--bottom--med">
											<p className="type--base type--color--text type--wgt--regular">$250</p>
										</div>
									</div>
									<div className="col col-sml-12 col-lrg-6 col-xxlrg-3">
										<div className="card card--primary card--med type--center u-mar--bottom--med">
											<p className="type--base type--color--text type--wgt--regular">Recurring deposits available</p>
										</div>
									</div>
								</React.Fragment>
							)}
						</div>
					)})}
					</React.Fragment>
				}

			{step === 2 && !isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && (
				<div className="row">
					<div className="col col-sml-12">
						<div className="card--sml type--med type--wgt--medium type--color--note">Overview</div>
					</div>
					<div className="col col-sml-12 col-xlrg-3">
						{paymentTypes.map(c => {
							let iconName = c.name
							.toLowerCase()
								.split(' ')
								.join('-');
							return (
								<div
								key={c.id}
									className="row"
									onClick={() => c.id !== form.$('paymentTypeId').value && onSelectPaymentType(c.id)}
								>
									<div className="col col-sml-12 col-lrg-12">
										<div
											className={`card--contribution card--med u-mar--bottom--med cursor--pointer ${c.id ===
												form.$('paymentTypeId').value && 'checked'}`}
										>
											<div className="row u-display--flex u-display--flex--align--center">
												<div className="col col-sml-2">
													<i
														className={`u-icon u-icon--med u-icon--${iconName} ${c.id ===
															form.$('paymentTypeId').value && 'checked'} u-push`}
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
								</div>
							);
						})}
					</div>
					<div className="col col-sml-12 col-xlrg-9">
						<div className="row">
							<div className="col col-sml-12 col-xxlrg-7">
								<EditFormContent form={form}>
									<div className="card card--primary card--med u-mar--bottom--med">
										<div className="row">
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
															additionalLabel={addButton}
														/>
													</div>
													<BaasicModal modalParams={bankAccountModal}>
														<BankAccountForm />
													</BaasicModal>
												</React.Fragment>
											)}
											{paymentType.abrv === 'check' && (
												<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
													<BasicInput field={form.$('checkNumber')} showLabel={false} />
												</div>
											)}
											{paymentType.abrv === 'chase-quickpay' && (
												<React.Fragment>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BasicInput field={form.$('transactionId')} showLabel={false} />
													</div>
													<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
														<BasicInput field={form.$('memo')} showLabel={false} />
													</div>
												</React.Fragment>
											)}
											<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
												<NumericInputField field={form.$('amount')} showLabel={false} />
											</div>
											<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
												<BasicFieldCheckbox field={form.$('isThirdParty')} />
											</div>
											<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
												<BasicFieldCheckbox field={form.$('isAgreeToPoliciesAndGuidelines')} />
											</div>
											<div className="col col-sml-12">
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
							<div className="col col-sml-12 col-xxlrg-5">
								<div className="card card--primary card--med u-mar--bottom--med">
									<h5 className="type--med type--wgt--medium u-mar--bottom--sml">
										{t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}
									</h5>
									<SimpleBaasicTable tableStore={previousContributionsTableStore} />
									<div className="type--right">
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

			{step === 3 && (
				<div className="row">
					<div className="col col-sml-12 col-lrg-9">
						<div className="row">
							<div className="col col-sml-12 col-lrg-12 u-mar--bottom--lrg">
								<h3 className="type--lrg type--wgt--medium">{t('CONTRIBUTION.CREATE.SUCCESS')}</h3>
							</div>
						</div>
						<div className="card card--primary card--med u-mar--bottom--med">
							<div className="row">
								<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
									<h4>{t('CONTRIBUTION.CREATE.SUMMARY')}</h4>
								</div>
								<div className="col col-sml-12 col-lrg-12">
									<p className="type--sml">{t('CONTRIBUTION.CREATE.PAYMENT_TYPE')}</p>
									{paymentTypes.find(c => c.id === form.$('paymentTypeId').value).name}
								</div>
								{(paymentType.abrv === 'ach' || paymentType.abrv === 'wire-transfer') && (
									<React.Fragment>
										<div className="col col-sml-12 col-lrg-12">
											{t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NAME')}
											{bankAccountDropdownStore.items.find(c => c.id === form.$('donorBankAccountId').value).name}
										</div>
										<div className="col col-sml-12 col-lrg-12">
											{t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NUMBER')}
											xxxx-xxxx-xxxx-
											{
												bankAccountDropdownStore.items.find(c => c.id === form.$('donorBankAccountId').value)
													.accountNumber
											}
										</div>
									</React.Fragment>
								)}
								{paymentType.abrv === 'check' && (
									<div className="col col-sml-12 col-lrg-12">
										{t('CONTRIBUTION.CREATE.CHECK_NUMBER')}
										{form.$('checkNumber').value}
									</div>
								)}

								{paymentType.abrv === 'chase-quickpay' && (
									<React.Fragment>
										<div className="col col-sml-12 col-lrg-12">
											{t('CONTRIBUTION.CREATE.TRANSACTION_ID')}
											{form.$('tranasctionId').value}
										</div>
										<div className="col col-sml-12 col-lrg-12">
											{t('CONTRIBUTION.CREATE.MEMO')}
											{form.$('memo').value}
										</div>
									</React.Fragment>
								)}
								<div className="col col-sml-12 col-lrg-12">
									{t('CONTRIBUTION.CREATE.AMOUNT')}
									<FormatterResolver
										item={{ amount: form.$('amount').value }}
										field="amount"
										format={{ type: 'currency' }}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col col-sml-12 col-lrg-3">
						<div className="card card--primary card--med u-mar--bottom--med">
							<h5>{t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}</h5>
							<SimpleBaasicTable tableStore={previousContributionsTableStore} />
							<BaasicButton
								className="btn btn--base btn--secondary  u-mar--top--med"
								label="CONTRIBUTION.CREATE.ALL_CONTRIBUTIONS"
								onClick={routes.allContributions}
							></BaasicButton>
						</div>
					</div>
				</div>
			)}
		</Page>
	);
};

ContributionCreateTemplate.propTypes = {
	contributionCreateViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(ContributionCreateTemplate);
