import React from 'react';
import { Page } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

function DashboardTemplate() {
	return (
		<Page>
			<div className="row">
				<div className="col col-sml-12 col-xxlrg-6 u-padd--right--sml u-padd--left--sml u-mar--bottom--med">
					admin
				</div>
			</div>
		</Page>
	);
}

DashboardTemplate.propTypes = {
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DashboardTemplate);
