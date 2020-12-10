import React from 'react';
import { Page } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';
import { DashboardHeader } from 'application/charity/dashboard/components';

function DashboardTemplate({ dashboardViewStore }) {
	const { charity } = dashboardViewStore
	return (
		<Page>
			<DashboardHeader />
			<div className="row">
				<div className="col col-sml-12 col-xxlrg-6 u-padd--right--sml u-padd--left--sml u-mar--bottom--med">
					{charity && charity.name}
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
