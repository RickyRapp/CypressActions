import React from 'react';
import { Page, PageHeader } from 'core/layouts';
import { BaasicButton, BaasicDropdown, BaasicModal, FormatterResolver, SimpleBaasicTable } from 'core/components';
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
	ChartValueAxis,
	ChartValueAxisItem,
} from '@progress/kendo-react-charts';
import { AccountManager } from 'application/donor/donor/components';
import { DonorGivingCardActivationTemplate } from '../../donor/components';
import { Transaction } from 'application/donor/activity/transaction/components';
import { GivingGoalsTemplate } from '../components';
import { localStorageProvider } from 'core/providers';
import moment from 'moment';

function DashboardTemplate({ dashboardViewStore, t, rootStore }) {
	const {
		donor,
		yearDropdownStore,
		newContributionOnClick,
		newGrantOnClick,
		orderBookletsOnClick,
		activateCardOnClick,
		activateCardModalParams,
		givingGoalsModalParams,
		newIncomeOnClick,
		oneTime,
		yearly,
		percentageYear,
		percentageMonth,
		editIncomeOnClick,
		yearlyGoal,
		//oneTimeGoal,
		oneTimeToGive,
		showMoreOptions,
		onShowMoreOptionsClick,
		tableStore,
		noGivingGoals
	} = dashboardViewStore;
	let categoriesMonths = [];
	if(window.innerWidth > 750) {
		categoriesMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	} else {
		categoriesMonths = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'];
	}
	let categoriesDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	let categoriesWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
	let categoriesYears = [];
	let dataGrants = [];
	let dataContributions = [];
	let chartDays = [];
	let categoriesYearToDate = [];
	//let isMultipleYears = false;
	function checkWeek(donor) {
		if (yearDropdownStore.value.id == 7 || yearDropdownStore.value.id == -7) {
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
			if (yearDropdownStore.value.id == -7) {
				for (let i = 0; i < 7; i++) {
					dataGrants.push(donor.donationsPerPastWeek[i].grants[0]);
				}
				for (let i = 0; i < 7; i++) {
					dataContributions.push(donor.donationsPerPastWeek[i].contributions[0]);
				}
			} else {
				for (let i = 0; i < 7; i++) {
					dataGrants.push(donor.donationsPerWeek[i].grants[0]);
				}
				for (let i = 0; i < 7; i++) {
					dataContributions.push(donor.donationsPerWeek[i].contributions[0]);
				}
			}
		}
	}
	function checkMonth(donor) {
		if (yearDropdownStore.value.id === 30 || yearDropdownStore.value.id === -30) {
			if (yearDropdownStore.value.id == -30) {
				for (let i = 0; i < 4; i++) {
					dataGrants.push(donor.donationsPerPastMonth[i].grants[0]);
					dataContributions.push(donor.donationsPerPastMonth[i].contributions[0]);
				}
			} else {
				for (let i = 0; i < 4; i++) {
					dataGrants.push(donor.donationsPerMonth[i].grants[0]);
					dataContributions.push(donor.donationsPerMonth[i].contributions[0]);
				}
			}
		}
	}
	function checkYear(donor) {
		if (donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id)) {
			dataGrants = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).grants.slice();
		}
		if (donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id)) {
			dataContributions = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).contributions.slice();
		}
	}
	if (donor && donor.donationsPerYear.length > 0) {
		checkWeek(donor);
		checkMonth(donor);
		checkYear(donor);

		if (yearDropdownStore.value.id === 1) {
			const today = moment();
			const minDate = moment(donor.minDate);
			if (today.diff(minDate, 'days') < 7) {
				yearDropdownStore.value.id = 7;
				checkWeek(donor);
			} else if (today.diff(minDate, 'days') < 31) {
				yearDropdownStore.value.id = 30;
				checkMonth(donor);
			} else if (today.diff(minDate, 'days') < 366) {
				yearDropdownStore.value.id = donor.donationsPerYear[0].year;
				checkYear(donor);
			} else {
				let multipleYears = [];
				for (let i = 0; i < donor.donationsPerYear.length; i++) {
					multipleYears.push({ year: donor.donationsPerYear[i].year, grants: donor.donationsPerYear[i].grants.length > 0 ? donor.donationsPerYear[i].grants[donor.donationsPerYear[i].grants.length - 1] : 0, contributions: donor.donationsPerYear[i].contributions.length > 0 ? donor.donationsPerYear[i].contributions[donor.donationsPerYear[i].contributions.length - 1] : 0});
					categoriesYears.push(donor.donationsPerYear[i].year);
					dataGrants.push(multipleYears[i].grants);
					dataContributions.push(multipleYears[i].contributions);
				}
			}
		}
		if (yearDropdownStore.value.id === 2) {
			const month = parseInt(moment().format("M"));
			if(month == 0) {
				yearDropdownStore.value.id = 30;
				checkMonth(donor);
			} else if (month == 11) {
				yearDropdownStore.value.id = new Date().getFullYear();
				checkYear(donor);
			} else {
				dataGrants = donor.donationsPerYear.find(c => c.year === (new Date()).getFullYear()).grants.slice(0, month);
				dataContributions = donor.donationsPerYear.find(c => c.year === (new Date()).getFullYear()).contributions.slice(0, month);
				categoriesYearToDate = categoriesMonths.slice(0, month);
			}
		}
	}
	if(yearDropdownStore && yearDropdownStore.value && yearDropdownStore.value.id != 1)
	{
		let previousYearGrants = 0, previousYearContributions = 0;
		if(donor && donor.donationsPerYear.length > 1) {
			if(yearDropdownStore.value.id > donor.donationsPerYear[0].year || yearDropdownStore.value.id == 2) {
				const previousYear = donor.donationsPerYear.find(c => c.year == (yearDropdownStore.value.id == 2 ? ((new Date().getFullYear()) - 1) : yearDropdownStore.value.id - 1));
				previousYearGrants = previousYear.grants[11] ? previousYear.grants[11] : 0;
				previousYearContributions = previousYear.contributions[11] ? previousYear.contributions[11] : 0;
			}
			if(dataGrants.length > 0)
				dataGrants = dataGrants.map(c => c - previousYearGrants);
			if(dataContributions.length > 0)
				dataContributions = dataContributions.map(c => c - previousYearContributions);

		} else {
			if(dataGrants.length > 0)
				dataGrants = dataGrants.map(c => dataGrants[dataGrants.length - 1] != (c - dataGrants[0]) ? (c - dataGrants[0]) : c);
			if(dataContributions.length > 0)
				dataContributions = dataContributions.map(c => dataContributions[dataContributions.length - 1] != (c - dataContributions[0]) ? (c - dataContributions[0]) : c);
			}
	}
	let grantsThisYear = dataGrants[dataGrants.length - 1];

	if(yearDropdownStore && yearDropdownStore.value && (yearDropdownStore.value.id == (new Date()).getFullYear() || yearDropdownStore.value.id == 2))
		localStorageProvider.add('grantsThisYear', grantsThisYear);
	//const oneTimeGoalAmount = (oneTime * (percentageMonth / 100));
	const yearlyGoalAmount = (yearly * (percentageYear / 100));
	const givingTotal = (localStorageProvider.get('grantsThisYear') / (oneTimeToGive + yearlyGoalAmount)) * 100;
	const labelVisual = (e) => {
		return `$${e.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
	};
	const currencyFormat = (e) => {
		return `$${e.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
	};
	const LineChartContainer = () => (
		<Chart style={{ height: 260 }}>
			<ChartCategoryAxis>
				<ChartCategoryAxisItem categories={yearDropdownStore.value.id > 2000 ? categoriesMonths : (yearDropdownStore.value.id == 7 || yearDropdownStore.value.id == -7 ? chartDays : (yearDropdownStore.value.id === 1 ? categoriesYears : (yearDropdownStore.value.id === 2 ? categoriesYearToDate : categoriesWeeks)))} />
			</ChartCategoryAxis>
			<ChartValueAxis>
				<ChartValueAxisItem labels={{visible: true, content: labelVisual}} />
			</ChartValueAxis>
			<ChartTooltip
				render={({ point }) => (
					<FormatterResolver item={{ amount: point.value }} field="amount" format={{ type: 'currency' }} />
				)}
			/>
			<ChartLegend position="bottom" orientation="horizontal" />
			<ChartSeries>
				<ChartSeriesItem color="#bc6d11" name={`Total contributed: ${dataContributions[dataContributions.length - 1] ? `${currencyFormat(dataContributions[dataContributions.length - 1])}` : '$' + (0).toFixed(2).toString()}`} type="line" data={dataContributions} />
				<ChartSeriesItem color="#223a5e" name={`Total granted: ${dataGrants[dataGrants.length - 1] ? `${currencyFormat(dataGrants[dataGrants.length - 1])}` : '$' + (0).toFixed(2).toString()}`} type="line" data={dataGrants} />
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
											className="btn btn--med btn--100 btn--primary--light u-display--flex--column"
											label="DASHBOARD.BUTTON.INVEST_FUNDS"
											disabled={true}
											message={"Coming Soon"}
										/>
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
				<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--med">
					{donor && donor.isContributionMade ? (
						<div className="dashboard-card u-mar--bottom--sml">
							<h3 className="dashboard-card__title dashboard-card__title--ordered u-mar--bottom--sml">{t('DASHBOARD.YOUR_GIVING')}</h3>

							<div className="dashboard-card__giving-goal">
								<p className="dashboard-card__giving-goal__label">Giving goal:</p>
								<div className="dashboard-card__giving-goal--range">
									<div
										style={{ 'width': `${givingTotal <= 100 && givingTotal > 0 ? givingTotal : oneTimeToGive == 0 && yearlyGoalAmount == 0 ? 100 : (oneTimeToGive + yearlyGoalAmount)>0 && grantsThisYear > 0 ? 100 : 0}%` }}
										className={`dashboard-card__giving-goal--range--progress${givingTotal >= 95 || (oneTimeToGive + yearlyGoalAmount) == 0 ? " dashboard-card__giving-goal--range--progress--rounded" : ""}`}>
										{givingTotal <= 100 ? <span className={`${givingTotal <= 12 ? "dashboard-card__giving-goal--goal" : ""}`}>{givingTotal.toFixed(2) + '%'}</span> : ((oneTimeToGive + yearlyGoalAmount) == 0 ? <span>No goals entered. <a onClick={() => noGivingGoals()}>Set up your giving goal?</a></span> : (oneTimeToGive + yearlyGoalAmount)>0 && grantsThisYear > 0 ? (100).toFixed(2) + '%' : 0 + '%')}
									</div>
									<p className="dashboard-card__giving-goal__income">
										<span className="type--wgt--regular type--base type--color--opaque">Yearly Goal:</span>{" "}
										<FormatterResolver
											item={{ amount: (oneTimeToGive + yearlyGoalAmount) }}
											field='amount'
											format={{ type: 'currency' }}
										/></p>
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
					(!donor.isGrantMade || !donor.isContributionMade || !donor.isOrderCertificatesMade || donor.hasCardForActivation) && (
						<div className="col col-sml-12 col-lrg-12">
							<div className="u-mar--bottom--med u-mar--top--med">
								<h3 className=" u-mar--bottom--med type--center">
									{t('DASHBOARD.FINISH_SETTING_UP_YOUR_ACCOUNT')}
								</h3>
								<div className="row type--center u-display--flex u-display--flex--justify--center">
									{donor.hasCardForActivation && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--tertiary "
												icon="u-icon u-icon--arrow-forward u-icon--med"
												label="DASHBOARD.BUTTON.ACTIVATE_CARD"
												onClick={activateCardOnClick}
											/>
										</div>
									)}
									{!donor.isOrderCertificatesMade && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--tertiary "
												icon="u-icon u-icon--arrow-forward u-icon--med"
												label="DASHBOARD.BUTTON.ORDER_CERTIFICATES"
												onClick={orderBookletsOnClick}
											/>
										</div>
									)}
									{!donor.isContributionMade && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--tertiary "
												icon="u-icon u-icon--arrow-forward u-icon--med"
												label="DASHBOARD.BUTTON.NEW_CONTRIBUTION"
												onClick={newContributionOnClick}
											/>
										</div>
									)}
									{!donor.isGrantMade && (
										<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
											<BaasicButton
												className="btn btn--med btn--tertiary "
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
				{window.innerWidth > 750 &&
				<div className="col col-sml-12 col-lrg-12 u-mar--bottom--med" id="giving-goals-card">
					<button type="button" className={`btn btn--show btn--show--secondary type--wgt--medium ${showMoreOptions ? "show" : ""}`} onClick={onShowMoreOptionsClick}>
						<i className={!showMoreOptions ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
						{showMoreOptions ? 'HIDE GIVING GOALS' : 'SHOW GIVING GOALS'}
						<i className={!showMoreOptions ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
					</button>
					{showMoreOptions &&
						<div className={`card--primary card--med ${showMoreOptions ? "show" : ""}`}>
							<h3 className="dashboard-card__title u-mar--bottom--sml">Giving Goals</h3>
							<div className="u-mar--top--med">
								<section className="modal__list">
									<div>% of Yearly Income</div>
									<div className="modal__list__divider"></div>
									<div className="modal__list__amount--secondary">
										<h2>
											<FormatterResolver
												item={{ amount: yearly * (percentageYear / 100) }}
												field='amount'
												format={{ type: 'currency' }}
											/>
										</h2>
									</div>
									{/* ${yearly * (percentageYear / 100)} */}
								</section>
								{yearly > 0 ?
									<section className="modal__list u-mar--bottom--lrg">
										<div className="type--base type--color--opaque">{percentageYear}% of ${yearly} income &nbsp;&nbsp; <a onClick={() => editIncomeOnClick(yearlyGoal)}>Manage</a></div>
									</section> : <section className="modal__list u-mar--bottom--lrg"></section>}
								<section className="modal__list">
									<div>% of One-Time Income</div>
									<div className="modal__list__divider"></div>
									<div className="modal__list__amount--secondary">
										<h2>
											<FormatterResolver
												item={{ amount: oneTimeToGive }}
												/*oneTime * (percentageMonth / 100) */
												field='amount'
												format={{ type: 'currency' }}
											/>
										</h2>
									</div>
									{/* ${oneTime * (percentageMonth/100)} */}
								</section>
								{oneTime > 0 ?
									<section className="modal__list u-mar--bottom--xlrg">
										<div className="type--base type--color--opaque">{percentageMonth !== 1 ? percentageMonth : null}% of ${oneTime} total one-time incomes &nbsp;&nbsp; </div>
										{/* <a onClick={() => editIncomeOnClick(oneTimeGoal)}>Manage</a> */}
									</section> : <section className="modal__list u-mar--bottom--lrg"></section>}
								<section className="modal__list">

									{
										oneTime < 0 ?
											null :
											<div className="u-mar--bottom--xlrg u-mar--right--sml">
												<BaasicButton
													className="btn btn--med btn--100 btn--primary--light"
													label="New One Time Income"
													onClick={() => newIncomeOnClick(false)}
												/>
											</div>
									}

									{
										yearly > 0 ?
											null :
											<div className="u-mar--bottom--xlrg w--100--to-med">
												<BaasicButton
													className="btn btn--med btn--100 btn--primary--light"
													label="New Yearly Income"
													onClick={() => newIncomeOnClick(true)}
												/>
											</div>
									}

								</section>

							</div>
							<h3 className="dashboard-card__title u-mar--bottom--med">One-Time Incomes This Year</h3>
							<SimpleBaasicTable tableStore={tableStore} />
						</div>
					}
				</div>
				}
				<div className="col col-sml-12 col-lrg-12">
					<div className="card card--primary card--med u-mar--bottom--med">
						<h3 className="dashboard-card__title u-mar--bottom--med">{t('DASHBOARD.RECENT_ACTIVITY')}</h3>
						<Transaction
							hideSearch={true}
							hidePager={true}
							hidePeriod={true}
							noBackground={true}
							/>
					</div>
				</div>
			</div>
			<BaasicModal modalParams={activateCardModalParams}>
				<DonorGivingCardActivationTemplate />
			</BaasicModal>
			<BaasicModal modalParams={givingGoalsModalParams}>
				<GivingGoalsTemplate />
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
