import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, SimpleBaasicTable } from 'core/components';
import {
	ACHTemplate,
	WireTransferTemplate,
	PaymentTypeInfoTemplate,
	StockAndSecuritiesTemplate,
	ThirdPartyDonorTemplate,
	CheckTemplate,
	ContributionFooterActionsTemplate,
} from 'themes/application/common/contribution/components';
import ZelleTemplate from './ZelleTemplate';
import PaycheckDirecktTemplate from './PaycheckDirecktTemplate';
import {
	copyZelleText,
	stockAndSecurityText,
	thirdPartyDonorText,
	checkText,
	paycheckDirectText,
} from './contributionText';

const ContributionCreateStep3Template = function({
	paymentType,
	routes,
	previousContributionsTableStore,
	bankAccount,
	form,
	t,
	clipboardText,
	downloadTxtFile,
	downloadStockTxtFile,
	downloadThirdPartyTxtFile,
	downloadZelleTxtFile,
	downloadCheckTxtFile,
	downloadPayrollDirectTxtFile,
}) {
	return (
		<div className="row">
			<div className="col col-sml-12 col-lrg-8">
				{paymentType.abrv === 'wire-transfer' && (
					<div className="card--enh--light card--sml">
						<h3 className="type--med type--color--note">
							Please provide your bank or financial institution with the following information
						</h3>
					</div>
				)}

				{paymentType.abrv === 'stock-and-securities' && (
					<div className="card--enh--light card--sml">
						<h3 className="type--med type--color--note">
							Please provide your brokerage firm or financial advisor with the following information so they can
							initiate the transfer.
						</h3>
					</div>
				)}

				{paymentType.abrv === 'zelle' && (
					<div className="card--enh--light card--sml">
						<h3 className="type--med type--color--note">
							Please use the below email address to initiate your Zelle or QuickPay payment.
						</h3>
					</div>
				)}

				{paymentType.abrv === 'third-party-donor-advised-funds' && (
					<div className="card--enh--light card--sml">
						<h3 className="type--med type--color--note">
							Please use the following information to initiate a grant from your donor-advised fund
						</h3>
					</div>
				)}

				{paymentType.abrv === 'check' && (
					<div className="card--enh--light card--sml">
						<h3 className="type--med type--color--note">Please use the following information to send us the check</h3>
					</div>
				)}

				{paymentType.abrv === 'paycheck-direct' && (
					<div className="card--enh--light card--sml">
						<h3 className="type--med type--color--note">
							Please provide your employer or payroll company with the following information
						</h3>
					</div>
				)}

				<div className="card--primary card--med u-mar--bottom--med">
					<p>
						<b>Step 2</b>
					</p>
					<h4 className="u-mar--bottom--sml">{t('CONTRIBUTION.CREATE.SUMMARY')}</h4>

					<div className="card--tny card--secondary u-mar--bottom--sml">
						<PaymentTypeInfoTemplate t={t} paymentType={paymentType} form={form} />

						{paymentType.abrv === 'ach' && form.$('bankAccountId').value && (
							<ACHTemplate t={t} bankAccount={bankAccount} />
						)}

						{paymentType.abrv === 'wire-transfer' && (
							<div id="clipboard-info">
								<WireTransferTemplate bankAccount={bankAccount} t={t} />
							</div>
						)}

						{paymentType.abrv === 'check' && (
							<div className="card--column--med">
								<span className="type--base type--wgt--medium type--color--opaque">
									{t('CONTRIBUTION.CREATE.CHECK_NUMBER')}
								</span>

								<span className="type--base type--wgt--bold u-push">{form.$('checkNumber').value}</span>
							</div>
						)}

						{paymentType.abrv === 'chase-quickpay' && (
							<React.Fragment>
								<div className="row">
									<div className="col col-sml-6">
										{t('CONTRIBUTION.CREATE.TRANSACTION_ID')}
										{form.$('tranasctionId').value}
									</div>
									<div className="col col-sml-6">
										{t('CONTRIBUTION.CREATE.MEMO')}
										{form.$('memo').value}
									</div>
								</div>
							</React.Fragment>
						)}

						{paymentType.abrv === 'stock-and-securities' && (
							<div id="clipboard-info">
								<StockAndSecuritiesTemplate />
							</div>
						)}

						{paymentType.abrv === 'zelle' && (
							<div id="clipboard-info">
								<ZelleTemplate />
							</div>
						)}

						{paymentType.abrv === 'third-party-donor-advised-funds' && (
							<ThirdPartyDonorTemplate bankAccount={bankAccount} t={t} />
						)}

						{paymentType.abrv === 'check' && <CheckTemplate bankAccount={bankAccount} t={t} />}

						{paymentType.abrv === 'paycheck-direct' && <PaycheckDirecktTemplate t={t} />}
					</div>

					{paymentType.abrv === 'wire-transfer' && (
						<ContributionFooterActionsTemplate
							downloadFile={downloadTxtFile}
							clipboardText={clipboardText}
							info={'Timeline: Funds will be made available to your account as soon as they are received!'}
						/>
					)}

					{paymentType.abrv === 'stock-and-securities' && (
						<ContributionFooterActionsTemplate
							downloadFile={downloadStockTxtFile}
							clipboardText={stockAndSecurityText({ t })}
							info={
								'What happens next? Once we receive the security transfer we will initiate a selling order and then fund your account with the full selling price.'
							}
						/>
					)}

					{paymentType.abrv === 'zelle' && (
						<div className="c-footer__actions u-mar--bottom--sml">
							<ContributionFooterActionsTemplate
								downloadFile={downloadZelleTxtFile}
								clipboardText={copyZelleText({ bankAccount, form })}
							/>
						</div>
					)}

					{paymentType.abrv === 'third-party-donor-advised-funds' && (
						<ContributionFooterActionsTemplate
							downloadFile={downloadThirdPartyTxtFile}
							clipboardText={thirdPartyDonorText({ bankAccount, form, t })}
						/>
					)}

					{paymentType.abrv === 'check' && (
						<ContributionFooterActionsTemplate
							downloadFile={downloadCheckTxtFile}
							clipboardText={checkText({ bankAccount, form, t })}
						/>
					)}

					{paymentType.abrv === 'paycheck-direct' && (
						<ContributionFooterActionsTemplate
							downloadFile={downloadPayrollDirectTxtFile}
							clipboardText={paycheckDirectText({ form, t })}
						/>
					)}

					{paymentType.abrv !== 'wire-transfer' && paymentType.abrv !== 'stock-and-securities' ? (
						<div className="type--color--note">
							<b>Timeline: Funds will be made available within 3 - 5 business days.</b>{' '}
						</div>
					) : null}
				</div>
			</div>
			<div className="col col-sml-12 col-lrg-4">
				<div className="card--primary card--med u-mar--bottom--med">
					<h5 className="type--med type--wgt--medium u-mar--bottom--sml">
						{t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}
					</h5>
					<SimpleBaasicTable tableStore={previousContributionsTableStore} />
					<BaasicButton
						className="btn btn--100 btn--primary u-mar--top--med"
						label="CONTRIBUTION.CREATE.ALL_CONTRIBUTIONS"
						onClick={routes.allContributions}
					/>
				</div>
			</div>
		</div>
	);
};

ContributionCreateStep3Template.propTypes = {
	paymentType: PropTypes.object.isRequired,
	routes: PropTypes.object.isRequired,
	previousContributionsTableStore: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
	bankAccount: PropTypes.object,
	downloadZelleTxtFile: PropTypes.func,
	t: PropTypes.func,
	clipboardText: PropTypes.string,
	downloadTxtFile: PropTypes.func,
	downloadStockTxtFile: PropTypes.func,
	downloadThirdPartyTxtFile: PropTypes.func,
	downloadCheckTxtFile: PropTypes.func,
	downloadPayrollDirectTxtFile: PropTypes.func,
};

export default defaultTemplate(ContributionCreateStep3Template);
