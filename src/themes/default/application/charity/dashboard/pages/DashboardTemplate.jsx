import React from 'react';
import { Page } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { DashboardHeader } from 'application/charity/dashboard/components';

function DashboardTemplate({ dashboardViewStore }) {
	const { charity, newContributionOnClick } = dashboardViewStore;

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
									<FormatterResolver
										// item={{ balance: donor.availableBalance }}
										field="balance"
										format={{ type: 'currency' }}
									/>
									$1.500,000
								</div>
								<p className="dashboard-card__body--title">AVAILABLE BALANCE</p>
							</div>
							<div className="row">
								<div className="col col-sml-12 col-lrg-6"><div className="u-mar--bottom--sml w--100--to-med">
									<BaasicButton
										className="btn btn--med btn--100 btn--primary--light"
										label="Deposit Funds"
										onClick={newContributionOnClick}
									/>
								</div></div>
								<div className="col col-sml-12 col-lrg-6"><div className="u-mar--bottom--sml w--100--to-med">
									<BaasicButton className="btn btn--med btn--100 btn--primary--light" label="Invest Funds" />
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
										<span className="type--base type--wgt--medium u-mar--right--med">Donations Per Year</span>
										{/* <BaasicDropdown store={yearDropdownStore} /> */}
									</div>
								</div>
							</div>
							<div className="row u-mar--bottom--med">
								<div className="col col-sml-12">{/* <LineChartContainer /> */}</div>
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
			</div>
		</Page>
	);
}

DashboardTemplate.propTypes = {
	dashboardViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DashboardTemplate);
