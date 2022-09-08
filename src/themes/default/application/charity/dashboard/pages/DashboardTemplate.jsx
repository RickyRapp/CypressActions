import React, { Component } from 'react';
import { Page } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, FormatterResolver, BaasicDropdown } from 'core/components';
import PropTypes from 'prop-types';
import { DashboardHeader } from 'application/charity/dashboard/components';
import {
	Chart,
	ChartSeries,
	ChartSeriesItem,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartLegend,
	ChartTooltip,
} from '@progress/kendo-react-charts';
import { AllTransactionList } from 'application/charity/activity/pages';

class DashboardTemplate extends Component {

	render() {
		const { dashboardViewStore, t } = this.props;

		const {
			charity,
			newContributionOnClick,
			redirectToWithdrawFundsPage,
			yearDropdownStore,
			notImplemented,
			manageAccount,
			dataGrants,
			grantsPerYear,
			redirectToManageAccount,
			availableBalance
		} = dashboardViewStore;

		const currencyFormat = (e) => {
			return `$${e.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
		};

		this.categories = {
			categoriesDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
			categoriesWeeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
			categoriesYears: ["2017", "2018", "2019", "2020", "2021", "2022"],
		}

		const monthsWords = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		const monthsNums = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'];

		const mobileResolution = window.innerWidth > 750;
		if (mobileResolution) {
			this.categories.categoriesMonths = monthsWords;
			this.categories.categoriesYearToDate = monthsWords;
		} else {
			this.categories.categoriesMonths = monthsNums;
			this.categories.categoriesYearToDate = monthsNums;
		}

		let categories = this.categories[dataGrants.type] || [];

		if (dataGrants.type === "categoriesWeeks" && dataGrants.item.every(i => i.name != 5)) {
			categories.splice(categories.length - 1);
		}

		if (dataGrants.type === "categoriesYearToDate" && dataGrants.item.length > 0) {
			categories = categories.slice(0, categories.indexOf(dataGrants.item.slice(-1)[0].name) + 1);
		}

		const checkWeek = () => {
			const todayDate = new Date();
			let dayOfWeek = todayDate.getDay();
			let counter = 0;
			if (dayOfWeek === 0) {
				categories = this.categories.categoriesDays;
			} else {
				categories = [];
				while (counter < 7) {
					if (dayOfWeek < 7) {
						categories.push(this.categories.categoriesDays[dayOfWeek++]);
						counter++;
					}
					else {
						dayOfWeek = 0;
					}
				}
			}
		}

		if (dataGrants.type === "categoriesDays" && dataGrants.item.length > 0) {
			dataGrants.item.forEach(item => item.name = this.categories.categoriesDays[Number(item.name)]);
			checkWeek();
		}

		const items = categories.map(cat => {
			const item = dataGrants.item.find(grant => cat.includes(grant.name));
			return (item && item.value) ? item.value : 0
		});

		const LineChartContainer = () => (
			<Chart style={{ height: 260 }}>
				<ChartCategoryAxis>
					<ChartCategoryAxisItem categories={categories} />
				</ChartCategoryAxis>
				<ChartTooltip
					render={({ point }) => (
						<FormatterResolver item={{ amount: point.value }} field="amount" format={{ type: 'currency' }} />
					)}
				/>
				<ChartLegend position="bottom" orientation="horizontal" />
				<ChartSeries>
					<ChartSeriesItem color="#223a5e" name={"Total grants received:" + " " + currencyFormat(dataGrants.totalValue)} type="line" data={items} />
				</ChartSeries>
			</Chart>
		);
		return (
			<Page>
				<DashboardHeader />
				<div className="row">
					<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--med">
						{charity && charity.name ? (
							<div className="dashboard-card dashboard-card--secondary">
								<h3 className=" u-mar--bottom--med">Your Funds</h3>
								<div className="dashboard-card__body">
									<div className="dashboard-card__body--amount">
										{availableBalance ?
											<FormatterResolver
												item={{ balance: availableBalance }}
												field="balance"
												format={{ type: 'currency' }}
											/> :
											"$0.00"
										}
									</div>
									<p className="dashboard-card__body--title">ACCOUNT BALANCE</p>
								</div>
								<div className="row">
									<div className="col col-sml-12 col-lrg-6"><div className="u-mar--bottom--sml w--100--to-med">
										<BaasicButton
											className="btn btn--med btn--100 btn--primary--light"
											label="Withdraw Funds"
											onClick={redirectToWithdrawFundsPage}
										/>
									</div></div>
									<div className="col col-sml-12 col-lrg-6"><div className="u-mar--bottom--sml w--100--to-med">
										<BaasicButton className="btn btn--med btn--100 btn--primary--light" label="Manage Account" onClick={redirectToManageAccount} />
									</div></div>
								</div>
							</div>
						) : (
							<div className="dashboard-card--emptystate">
								<h3 className=" u-mar--bottom--med">Your Funds</h3>
								<div className="dashboard-card--emptystate__body">
									<p className="dashboard-card--emptystate__body--title">No Activity yet!</p>
									<p className="dashboard-card--emptystate__body--info">Make your first contribution today</p>
									<BaasicButton
										className="btn btn--secondary btn--med btn--med--wide"
										// label="DASHBOARD.BUTTON.DEPOSIT_FUNDS"
										onClick={newContributionOnClick}
									/>
								</div>
							</div>
						)}
					</div>

					<div className="col col-sml-12 col-xxlrg-6">
						{charity && charity.name ? (
							<div className="dashboard-card dashboard-card--secondary">
								<div className="row u-mar--bottom--tny remove--sml">
									<div className="col col-sml-12">
										<div className="u-display--flex row__align--center">
											<span className="type--base type--wgt--medium u-mar--right--med">Total grants received</span>
											{/* <LineChartContainer /> */}
											<BaasicDropdown store={yearDropdownStore} />
										</div>
									</div>
								</div>
								<div className="row u-mar--bottom--med">
									<div className="col col-sml-12"><LineChartContainer className="col-xlrg-12 col-xxlrg-12" /></div>
								</div>
							</div>
						) : (
							<div className="dashboard-card--emptystate card--med">
								<h3 className=" u-mar--bottom--med">Your Giving</h3>
								<div className="dashboard-card--emptystate__body">
									<p className="dashboard-card--emptystate__body--title">No Activity yet!</p>
									<p className="dashboard-card--emptystate__body--info">Make your first contribution today</p>
									<BaasicButton
										className="btn btn--secondary btn--med btn--med--wide"
										// label="DASHBOARD.BUTTON.DEPOSIT_FUNDS"
										onClick={newContributionOnClick}
									/>
								</div>
							</div>
						)}
					</div>
					<div className="col col-sml-12 col-lrg-12">
						<div className="u-mar--bottom--med u-mar--top--med">
							<h3 className=" u-mar--bottom--med type--center">
								Finish setting up your account
							</h3>
							<div className="row type--center u-display--flex u-display--flex--justify--center">
								{charity && (
									<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
										<BaasicButton
											className="btn btn--med btn--med--100 btn--tertiary "
											icon="u-icon u-icon--arrow-forward u-icon--med"
											label="VIEW INVESTMENT OPTIONS"
											onClick={() => alert(true)}
										/>
									</div>
								)}
								{charity && (
									<div className="col col-sml-12 col-xlrg-6 col-xxlrg-3 u-mar--bottom--med">
										<BaasicButton
											className="btn btn--med btn--med--100 btn--tertiary "
											icon="u-icon u-icon--arrow-forward u-icon--med"
											label="CONNECT TO YOUR WEBSITE"
											onClick={() => alert(true)}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col col-sml-12 col-lrg-12">
						<div className="card card--primary card--med u-mar--bottom--med">
							<h3 className="dashboard-card__title u-mar--bottom--med">{t('DASHBOARD.RECENT_ACTIVITY')}</h3>
							<AllTransactionList hideSearch={true} hideCheckBox={true} />
						</div>
					</div>
				</div>
			</Page>
		);
	}
}

DashboardTemplate.propTypes = {
	dashboardViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DashboardTemplate);
