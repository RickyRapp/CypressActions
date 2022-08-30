import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const StockAndSecuritiesTemplate = ({ t }) => {
	return (
		<React.Fragment>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">Beneficiary</span>
				<span className="type--base type--wgt--bold u-push">Donors’ Fund Inc</span>
			</div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">Address</span>
				<span className="type--base type--wgt--bold u-push">{t('MAILING_ADDRESS')}</span>
			</div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">EIN (tax ID)</span>
				<span className="type--base type--wgt--bold u-push">47-4844275</span>
			</div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">Brokerage Firm</span>
				<span className="type--base type--wgt--bold u-push">Fidelity Investment</span>
			</div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">DTC</span>
				<span className="type--base type--wgt--bold u-push">0226</span>
			</div>
			<div className="u-mar--bottom--med">
				<span className="type--base type--wgt--medium type--color--opaque">Brokerage Number</span>
				<span className="type--base type--wgt--bold u-push">Z50762458</span>
			</div>
		</React.Fragment>
	);
};

export default defaultTemplate(StockAndSecuritiesTemplate);

StockAndSecuritiesTemplate.propTypes = {
	t: PropTypes.func,
};
