import React from 'react';
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

function DashboardTemplate({ dashboardViewStore, t }) {
	const { 
		charity, 
		newContributionOnClick, 
		redirectToWithdrawFundsPage, 
		yearDropdownStore,
		notImplemented,
		manageAccount, 
		balance, 
		grantsPerYear,
		redirectToManageAccount,
		availableBalance
	} = dashboardViewStore;
	let categories = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	let dataGrants = [];
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
				<ChartSeriesItem color="#223a5e" name="Total grants received" type="line" data={dataGrants} />
			</ChartSeries>
		</Chart>
	);
	return (
		<Page>
			<DashboardHeader />

			<div className="card card--sml card--primary u-mar--bottom--med">
				<div className="dashboard__top">
					<h3>
						Finish setting up your account
					</h3>
					<div className="dashboard__top__buttons">
						{charity && (
							<BaasicButton
								className="btn btn--med btn--primary--light "
								icon="u-icon u-icon--arrow-forward u-icon--base"
								label="VIEW INVESTMENT OPTIONS"
								onClick={() => alert(true)}
							/>
						)}
						{charity && (
							<BaasicButton
								className="btn btn--med btn--primary--light "
								icon="u-icon u-icon--arrow-forward u-icon--base"
								label="CONNECT TO YOUR WEBSITE"
								onClick={() => alert(true)}
							/>
						)}
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--med">
					{charity && charity.name ? (
						<div className="dashboard-card dashboard-card--secondary">
							<h3 className=" u-mar--bottom--med">Your Funds</h3>
							<div className="dashboard-card__body">
								<div className="dashboard-card__body--amount">
									<FormatterResolver
										item={{ balance: availableBalance }}
										field="balance"
										format={{ type: 'currency' }}
									/>
								</div>
								<p className="dashboard-card__body--title">ACCOUNT BALANCE</p>
							</div>
							<div className="dashboard-card__footer dashboard-card__footer--buttons">
								<BaasicButton
									className="btn btn--med btn--100 btn--primary--light"
									label="Withdraw Funds"
									onClick={redirectToWithdrawFundsPage}
								/>
								<BaasicButton
									className="btn btn--med btn--100 btn--primary--light"
									label="Manage Account"
									onClick={redirectToManageAccount}
								/>
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

				<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--med">
					{charity && charity.name ? (
						<div className="dashboard-card dashboard-card--secondary">
							<div className="u-display--flex u-display--flex--justify--space-between u-mar--bottom--sml">
								<h3 className="u-mar--right--med">Total grants received</h3>
								{/* <LineChartContainer /> */}
								<BaasicDropdown store={yearDropdownStore} />
							</div>

							<LineChartContainer className="" />
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
			</div>

			<div className="card card--sml card--primary">
				<h3 className="dashboard-card__title u-mar--bottom--med">{t('DASHBOARD.RECENT_ACTIVITY')}</h3>
				<AllTransactionList removeCardStyle hideSearch={true} hideCheckBox={true} />
			</div>

		</Page>
	);
}

DashboardTemplate.propTypes = {
	dashboardViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DashboardTemplate);
