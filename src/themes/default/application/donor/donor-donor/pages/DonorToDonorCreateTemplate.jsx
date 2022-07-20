import React from 'react';
import PropTypes from 'prop-types';
import {
	BaasicFieldDropdown,
	NumericInputField,
	SimpleBaasicTable,
	FormatterResolver,
	BaasicButton,
	BasicInput,
	BaasicModal,
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, EditFormLayout } from 'core/layouts';
import { TransferConfirmTemplate } from 'themes/application/donor/donor-donor/components';

const DonorToDonorCreateTemplate = function({ donorToDonorCreateViewStore, t }) {
	const {
		contentLoading,
		form,
		grantAcknowledgmentTypeDropdownStore,
		donorBalance,
		recentTransfersTableStore,
		loaderStore,
		grantAcknowledgmentName,
		onSubmitClick,
		addAnotherRecipient,
		confirmModal,
		addAnotherRecipientForm,
		openFAQ,
		summaryInfo,
		errorMessage,
		additionalErrorMessage,
	} = donorToDonorCreateViewStore;

	return (
		<React.Fragment>
			<EditFormLayout store={donorToDonorCreateViewStore} loading={loaderStore.loading} layoutFooterVisible={false}>
				<Content loading={contentLoading}>
					{!summaryInfo && (
						<div className="row row--form">
							<div className="col col-sml-12 col-xxlrg-6">
								<div className="card--primary card--med u-mar--bottom--med">
									<h3 className=" u-mar--bottom--base">{t('DONOR-DONOR.CREATE.FROM_TITLE')}</h3>
									<h4 className="type--base u-mar--bottom--lrg">{t('DONOR-DONOR.CREATE.TITLE_LABEL')}</h4>
									<div className="row row--form u-mar--bottom--sml">
										<div className="form__group col col-sml-12">
											<div className="type--center">
												<div className="dashboard-card__body--amount">
													{donorBalance && (
														<FormatterResolver
															item={{ balance: donorBalance.availableBalance }}
															field="balance"
															format={{ type: 'currency' }}
														/>
													)}
												</div>
												<p className="type--uppercase">{t('DONOR-DONOR.CREATE.BALANCE')}</p>
											</div>
										</div>
									</div>
								</div>
								<div className="card--primary card--med u-mar--bottom--med">
									<h3>{t('DONOR-DONOR.CREATE.SEND_TO')}:</h3>
									<h4 className="type--base u-mar--bottom--med">{t('DONOR-DONOR.CREATE.SEND_TO_INFO_TITLE')}</h4>
									<div className="row row--form">
										<div className="col col-sml-12 col-lrg-6 col-xxlrg-12 col-xxxlrg-6 u-mar--bottom--sml">
											<BasicInput field={form.$('emailOrAccountNumber')} />
											<p className="validation__message">{errorMessage}</p>
										</div>
										<div className="col col-sml-12 col-lrg-6 col-xxlrg-12 col-xxxlrg-6 u-mar--bottom--sml">
											<BasicInput field={form.$('contactInformationName')} />
										</div>
										<div>
											<div className="col col-sml-12 col-xlrg-12 u-mar--bottom--sml">
												<a onClick={() => addAnotherRecipient(true)}>
													{t(
														!addAnotherRecipientForm
															? 'DONOR-DONOR.CREATE.ADD_ANOTHER_RECIPIENT_+'
															: 'DONOR-DONOR.CREATE.ADD_ANOTHER_RECIPIENT_-'
													)}
													{t('DONOR-DONOR.CREATE.ADD_ANOTHER_RECIPIENT')}
												</a>
											</div>
										</div>
									</div>
									{addAnotherRecipientForm && (
										<div className="row row--form u-mar--bottom--med">
											<div className="col col-sml-12 col-lrg-6 col-xxlrg-12 col-xxxlrg-6 u-mar--bottom--sml">
												<BasicInput field={form.$('emailOrAccountNumberAnother')} />
												<p className="validation__message">{additionalErrorMessage}</p>
											</div>
											<div className="col col-sml-12 col-lrg-6 col-xxlrg-12 col-xxxlrg-6 u-mar--bottom--sml">
												<BasicInput field={form.$('contactInformationNameAnother')} />
											</div>
										</div>
									)}
									<div className="row row--form">
										<div className="form__group col col-sml-12">
											<BaasicFieldDropdown
												field={form.$('grantAcknowledgmentTypeId')}
												store={grantAcknowledgmentTypeDropdownStore}
											/>
										</div>
										{grantAcknowledgmentName && (
											<div className="form__group col col-sml-12">
												<div className="charity-information__card charity-information__card--secondary">
													{grantAcknowledgmentName}
												</div>
											</div>
										)}
									</div>
									<div className="row row--form">
										<div className="form__group col col-sml-12 col-lrg-12">
											<NumericInputField field={form.$('amount')} />
										</div>
									</div>
									<div className="type--right">
										<BaasicButton
											type="button"
											className="btn btn--med btn--med--wide btn--secondary"
											onClick={onSubmitClick}
											form={form}
											onSubmit={onSubmitClick}
											label="DONOR-DONOR.CREATE.BUTTON.CREATE"
										/>
									</div>
								</div>
							</div>
							<div className="col col-sml-12 col-xxlrg-6 u-hide--to--med">
								<div className="card--primary card--med u-mar--bottom--med">
									<h3 className=" u-mar--bottom--base">{t('DONOR-DONOR.CREATE.TRANSFERS')}</h3>
									<div className="row row--form u-mar--bottom--med">
										<div className="col col-sml-12 col-lrg-12">
											<h4 className="type--base type--wgt--medium u-mar--bottom--med">
												{t('DONOR-DONOR.CREATE.RECENT_TRANSFERS')}
											</h4>
											<SimpleBaasicTable tableStore={recentTransfersTableStore} />
										</div>
									</div>
									<div className="row row--form u-mar--bottom--med">
										<div className="col col-sml-12 col-lrg-12">
											<div className="card--enh card--med">
												<h4 className="type--base type--wgt--medium u-mar--bottom--med type--color--note">
													{t('DONOR-DONOR.CREATE.FAQ')}
												</h4>
												<ul className="list--faq">
													<li className="list--faq__item js-faq-item">
														<i
															className="list--faq__icon js-faq-icon whatIsGift is-expanded cursor--pointer"
															onClick={() => openFAQ('whatIsGift')}
														></i>
														<div className="list--faq__text">
															<h4>{t('DONOR-DONOR.CREATE.FAQ_WHAT_IS_GIFT')}</h4>
															<span className="js-faq-hidden list--faq__answer whatIsGift is-expanded">
																{t('DONOR-DONOR.CREATE.FAQ_WHAT_IS_GIFT_ANSWER')}
															</span>
														</div>
													</li>
													{/* 
                                                <li className="list--faq__item js-faq-item">
                                                    <i className="list--faq__icon js-faq-icon existingDonor cursor--pointer" onClick={() => openFAQ('existingDonor')}></i>
                                                    <div className="list--faq__text">
                                                        <h4>{t('DONOR-DONOR.CREATE.FAQ_NON_EXISTING_DONOR')}</h4>
                                                        <span className="js-faq-hidden list--faq__answer existingDonor">{t('DONOR-DONOR.CREATE.FAQ_NON_EXISTING_DONOR_ANSWER')}</span>
                                                    </div>
                                                </li>
                                                <li className="list--faq__item js-faq-item">
                                                    <i className="list--faq__icon js-faq-icon wrongEmail cursor--pointer" onClick={() => openFAQ('wrongEmail')}></i>
                                                    <div className="list--faq__text">
                                                        <h4>{t('DONOR-DONOR.CREATE.FAQ_WRONG_EMAIL_ADDRESS')}</h4>
                                                        <span className="js-faq-hidden list--faq__answer wrongEmail">{t('DONOR-DONOR.CREATE.FAQ_WRONG_EMAIL_ADDRESS_ANSWER')}</span>
                                                    </div>
                                                </li>
                                                */}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{summaryInfo && (
						<div>
							<div className="row">
								<div className="col col-sml-12 col-lrg-12 u-mar--bottom--lrg">
									<h3 className=" type--color--note">{t('DONOR-DONOR.CONFIRMATION.SUCCESS')}</h3>
								</div>
							</div>
							<div className="card--primary card--med u-mar--bottom--med">
								<div>
									<h4 className="u-mar--bottom--sml">{t('DONOR-DONOR.CONFIRMATION.GIFT_SUMMARY')}</h4>

									<div className="card--tny card--secondary u-mar--bottom--sml">
										<div className="row">
											<div className="col col-sml-12 col-lrg-6">
												<span className="type--base type--wgt--medium type--color--opaque">
													{t('DONOR-DONOR.CONFIRMATION.RECIPIENT_INFO')}
												</span>
											</div>
											<div className="col col-sml-12 col-lrg-6 type--right--from--med">
												<span className="type--base type--wgt--bold">{form.$('emailOrAccountNumber').value}</span>
											</div>
										</div>
									</div>

									<div className="card--tny card--secondary u-mar--bottom--sml">
										<div className="row">
											<div className="col col-sml-12 col-lrg-6">
												<span className="type--base type--wgt--medium type--color--opaque">
													{t('DONOR-DONOR.CONFIRMATION.RECIPIENT_NAME')}
												</span>
											</div>
											<div className="col col-sml-12 col-lrg-6 type--right--from--med">
												<span className="type--base type--wgt--bold">{form.$('contactInformationName').value}</span>
											</div>
										</div>
									</div>

									{form.$('emailOrAccountNumberAnother').value && (
										<div className="card--tny card--secondary u-mar--bottom--sml">
											<div className="row">
												<div className="col col-sml-12 col-lrg-6">
													<span className="type--base type--wgt--medium type--color--opaque">
														{t('DONOR-DONOR.CONFIRMATION.ANOTHER_RECIPIENT')}
													</span>
												</div>
												<div className="col col-sml-12 col-lrg-6 type--right--from--med">
													<span className="type--base type--wgt--bold">
														{form.$('emailOrAccountNumberAnother').value}
													</span>
												</div>
											</div>
										</div>
									)}
									{form.$('contactInformationNameAnother').value && (
										<div className="card--tny card--secondary u-mar--bottom--sml">
											<div className="row">
												<div className="col col-sml-12 col-lrg-6">
													<span className="type--base type--wgt--medium type--color--opaque">
														{t('DONOR-DONOR.CONFIRMATION.ANOTHER_RECIPIENT_NAME')}
													</span>
												</div>
												<div className="col col-sml-12 col-lrg-6 type--right--from--med">
													<span className="type--base type--wgt--bold">
														{form.$('contactInformationNameAnother').value}
													</span>
												</div>
											</div>
										</div>
									)}
									<div className="card--tny card--secondary">
										<div className="row">
											<div className="col col-sml-12 col-lrg-6">
												<span className="type--base type--wgt--medium type--color--opaque">
													{t('DONOR-DONOR.CONFIRMATION.AMOUNT')}
												</span>
											</div>
											<div className="col col-sml-12 col-lrg-6 type--right--from--med">
												<span className="type--base type--wgt--bold">
													<FormatterResolver
														item={{ amount: form.$('amount').value }}
														field="amount"
														format={{ type: 'currency' }}
													/>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</Content>
			</EditFormLayout>
			<BaasicModal modalParams={confirmModal}>
				<TransferConfirmTemplate form={form} />
			</BaasicModal>
		</React.Fragment>
	);
};

DonorToDonorCreateTemplate.propTypes = {
	donorToDonorCreateViewStore: PropTypes.object.isRequired,
	confirmModal: PropTypes.any,
	form: PropTypes.object,
	onSubmitClick: PropTypes.func,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorToDonorCreateTemplate);
