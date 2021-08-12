import React from 'react';
import { Page } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';
import CharityPlaid from 'application/charity/charity/components/CharityPlaid';

function DashboardTemplate() {
	return (
		<Page>
			<div className="row">
				<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--med">
					admin
				</div>
				<CharityPlaid/>
			</div>
		</Page>
	);
}

DashboardTemplate.propTypes = {
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DashboardTemplate);
