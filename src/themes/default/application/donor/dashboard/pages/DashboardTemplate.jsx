import React from 'react';
import { Page, PageHeader } from 'core/layouts';
import { BaasicButton, BaasicDropdown, BaasicModal, FormatterResolver } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';
import {
	Chart,
	ChartSeries,
	ChartSeriesItem,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartLegend,
	ChartTooltip,
} from '@progress/kendo-react-charts';
import { AccountManager } from 'application/donor/donor/components';
import { DonorGivingCardActivationTemplate } from '../../donor/components';
import { Transaction } from 'application/donor/activity/transaction/components';

function DashboardTemplate({ dashboardViewStore, t, rootStore }) {
	const {
		donor,
		yearDropdownStore,
		newContributionOnClick,
		newGrantOnClick,
		orderBookletsOnClick,
		activateCardOnClick,
		activateCardModalParams,
	} = dashboardViewStore;

	let categoriesMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	let categoriesDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	let categoriesWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
	//let categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let dataGrants = [];
	let dataContributions = [];
	let chartDays = [];

	if (donor) {
		if (yearDropdownStore.value.id == 7) {
			const todayDate = new Date();
			let dayOfWeek = todayDate.getDay();
			let counter = 0;
			if (dayOfWeek === 0) {
				chartDays = categoriesDays;
			} else {
				dayOfWeek += 1;
				while (counter < 7) {
					if (dayOfWeek < 7) {
						chartDays.push(categoriesDays[dayOfWeek++]);
						counter++;
					}
					else {
						dayOfWeek = 0;
					}
				}
			}
			for (let i = 0; i < 7; i++) {
				dataGrants.push(donor.donationsPerWeek[i].grants[0]);
			}
			for (let i = 0; i < 7; i++) {
				dataContributions.push(donor.donationsPerWeek[i].contributions[0]);
			}
		}
		if (yearDropdownStore.value.id === 30) {
			for (let i = 0; i < 4; i++) {
				dataGrants.push(donor.donationsPerMonth[i].grants[0]);
				dataContributions.push(donor.donationsPerMonth[i].contributions[0]);
			}
		}
		if (donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id)) {
			dataGrants = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).grants.slice();
		}
		if (donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id)) {
			dataContributions = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).contributions.slice();
		}
	}
	const LineChartContainer = () => (
		<Chart style={{ height: 260 }}>
			<ChartCategoryAxis>
				<ChartCategoryAxisItem categories={yearDropdownStore.value.id === 2021 ? categoriesMonths : (yearDropdownStore.value.id == 7 ? chartDays : categoriesWeeks)} />
			</ChartCategoryAxis>
			<ChartTooltip
				render={({ point }) => (
					<FormatterResolver item={{ amount: point.value }} field="amount" format={{ type: 'currency' }} />
				)}
			/>
			<ChartLegend position="bottom" orientation="horizontal" />
			<ChartSeries>
				<ChartSeriesItem color="#bc6d11" name={`Total contributed: $${dataContributions[dataContributions.length - 1] ? `${dataContributions[dataContributions.length - 1].toFixed(2)}` : (0).toFixed(2)}`} type="line" data={dataContributions} />
				<ChartSeriesItem color="#223a5e" name={`Total granted: $${dataGrants[dataContributions.length - 1] ? `${dataGrants[dataGrants.length - 1].toFixed(2)}` : (0).toFixed(2)}`} type="line" data={dataGrants} />
			</ChartSeries>
		</Chart>
	);

	return (
		<Page>
			<PageHeader>
				{rootStore.userStore.user && rootStore.userStore.user.donor ? (
					<React.Fragment>
						<div className="col col-sml-12">
							<span className="type--med type--wgt--medium">{rootStore.userStore.user.donor.fundName}</span>
							<p className="type--base type--color--opaque">
								Account Number: <span className="type--wgt--bold">{rootStore.userStore.user.donor.accountNumber}</span>
							</p>
						</div>
						{rootStore.userStore.user.donor.accountType.abrv === 'private' && <AccountManager />}
					</React.Fragment>
				) : null}
			</PageHeader>
			<div className="row">
				<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--med">
					{donor && (donor.isContributionMade || donor.availableBalance) ? (
						<div className="dashboard-card">
							<h3 className="dashboard-card__title u-mar--bottom--sml">{t('DASHBOARD.YOUR_FUNDS')}</h3>
							<div className="dashboard-card__body">
								<div className="dashboard-card__body--amount">
									{donor && (
										<FormatterResolver
											item={{ balance: donor.availableBalance }}
											field="balance"
											format={{ type: 'currency' }}
										/>
									)}
								</div>
								<p className="dashboard-card__body--title">{t('DASHBOARD.PRESENT_BALANCE')}</p>

								{donor && (
									<p className="dashboard-card__body--amount--secondary">
										<FormatterResolver
											item={{ balance: donor.presentBalance }}
											field="balance"
											format={{ type: 'currency' }}
										/>
									</p>
								)}
								<p className="dashboard-card__body--title">{t('DASHBOARD.AVAILABLE_BALANCE')}</p>
							</div>

							<div className="row">
								<div className="col col-sml-12 col-med-6">
									<div className="u-mar--bottom--sml w--100--to-med">
										<BaasicButton
											className="btn btn--med btn--100 btn--primary--light"
											label="DASHBOARD.BUTTON.CONTRIBUTE"
											onClick={newContributionOnClick}
										/>
									</div>
								</div>
								<div className="col col-sml-12 col-med-6">
									<div className="u-mar--bottom--sml w--100--to-med u-position--rel">
										<BaasicButton
											className="btn btn--med btn--100 btn--primary--light"
											label="DASHBOARD.BUTTON.INVEST_FUNDS"
											disabled={true}
										/>
										<div className="message--soon">Coming Soon</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="dashboard-card--emptystate">
							<h3 className="dashboard-card__title u-mar--bottom--sml">{t('DASHBOARD.YOUR_FUNDS')}</h3>
							<div className="dashboard-card--emptystate__body">
								<p className="dashboard-card--emptystate__body--title">No Activity yet!</p>
								<p className="dashboard-card--emptystate__body--info">Make your first contribution today</p>
								<BaasicButton
									className="btn btn--secondary btn--med btn--med--wide"
									label="DASHBOARD.BUTTON.DEPOSIT_FUNDS"
									onClick={newContributionOnClick}
								/>
							</div>
						</div>
					)}
				</div>
				<div className="col col-sml-12 col-xxlrg-6">
					{donor && donor.isContributionMade ? (
						<div className="dashboard-card">
							<h3 className="dashboard-card__title dashboard-card__title--ordered u-mar--bottom--sml">{t('DASHBOARD.YOUR_GIVING')}</h3>

							<div className="dashboard-card__giving-goal">
								<p className="dashboard-card__giving-goal__label">Giving goal:</p>
								<div className="dashboard-card__giving-goal--range">
									<div style={{ 'width': '50%' }} className="dashboard-card__giving-goal--range--progress">Coming soon!</div>
								</div>
							</div>

							<div className="u-separator--primary u-mar--top--sml u-mar--bottom--sml dashboard-card__separator"></div>

							<div className="dashboard-card__chart">
								<div className="row u-mar--bottom--tny">
									<div className="col col-sml-12">
										<div className="u-display--flex row__align--center">
											<span className="type--base type--wgt--medium u-mar--right--med">Total Given</span>
											<BaasicDropdown className="form-field--sml" store={yearDropdownStore} />
										</div>
									</div>
								</div>

								<div className="row u-mar--bottom--med">
									<div className="col col-sml-12">
										<LineChartContainer />
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="dashboard-card--emptystate card--med">
							<h3 className="dashboard-card__title u-mar--bottom--sml">{t('DASHBOARD.YOUR_GIVING')}</h3>
							<div className="dashboard-card--emptystate__body">
								<p className="dashboard-card--emptystate__body--title">No Activity yet!</p>
								<p className="dashboard-card--emptystate__body--info">Make your first contribution today</p>
								<BaasicButton
									className="btn btn--secondary btn--med btn--med--wide"
									label="DASHBOARD.BUTTON.DEPOSIT_FUNDS"
									onClick={newContributionOnClick}
								/>
							</div>
						</div>
					)}
				</div>
				{donor &&
				//|| !donor.isInvestmentMade - this isn't implemented yet
					(!donor.isGrantMade || !donor.isContributionMade || !donor.isOrderCertificatesMade) && (
						<div className="col col-sml-12 col-lrg-12">
							<div className="u-mar--bottom--med u-mar--top--med">
								<h3 className=" u-mar--bottom--med type--center">
									{t('DASHBOARD.FINISH_SETTING_UP_YOUR_ACCOUNT')}
								</h3>
								<div className="row type--center u-display--flex u-display--flex--justify--center">
									{donor.hasCardForActivation && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--med--100 btn--tertiary "
												icon="u-icon u-icon--arrow-forward u-icon--med"
												label="DASHBOARD.BUTTON.ACTIVATE_CARD"
												onClick={activateCardOnClick}
											/>
										</div>
									)}
									{!donor.isOrderCertificatesMade && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--med--100 btn--tertiary "
												icon="u-icon u-icon--arrow-forward u-icon--med"
												label="DASHBOARD.BUTTON.ORDER_CERTIFICATES"
												onClick={orderBookletsOnClick}
											/>
										</div>
									)}
									{!donor.isContributionMade && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--med--100 btn--tertiary "
												icon="u-icon u-icon--arrow-forward u-icon--med"
												label="DASHBOARD.BUTTON.NEW_CONTRIBUTION"
												onClick={newContributionOnClick}
											/>
										</div>
									)}
									{!donor.isGrantMade && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--med--100 btn--tertiary "
												icon="u-icon u-icon--arrow-forward u-icon--med"
												label="DASHBOARD.BUTTON.NEW_GRANT"
												onClick={newGrantOnClick}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				<div className="col col-sml-12 col-lrg-12">
					<div className="card card--primary card--med u-mar--bottom--med">
						<h3 className="dashboard-card__title u-mar--bottom--med">{t('DASHBOARD.RECENT_ACTIVITY')}</h3>
						<Transaction
							hideSearch={true}
							hidePager={true} />
					</div>
				</div>
			</div>
			<BaasicModal modalParams={activateCardModalParams}>
				<DonorGivingCardActivationTemplate />
			</BaasicModal>
		</Page>
	);
}

DashboardTemplate.propTypes = {
	dashboardViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	rootStore: PropTypes.object.isRequired,
};

export default defaultTemplate(DashboardTemplate);
