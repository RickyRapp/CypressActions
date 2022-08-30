import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const PaycheckDirecktTemplate = ({ t }) => {
	return (
		<div>
			<div className="u-mar--bottom--med">
				<div className="card--column--med">
					<span className="type--base type--wgt--medium type--color--opaque">Beneficiary</span>
					<span className="type--base type--wgt--bold u-push">The Donors Fund</span>
				</div>
				<div className="card--column--med">
					<span className="type--base type--wgt--medium type--color--opaque">Address</span>
					<span className="type--base type--wgt--bold u-push">{t('MAILING_ADDRESS')}</span>
				</div>
				<div className="card--column--med">
					<span className="type--base type--wgt--medium type--color--opaque">Beneficiary bank</span>
					<span className="type--base type--wgt--bold u-push">JP Morgan Chase</span>
				</div>
				<div className="card--column--med">
					<span className="type--base type--wgt--medium type--color--opaque">ABA (routing number)</span>
					<span className="type--base type--wgt--bold u-push">021000021</span>
				</div>
				<div className="u-mar--bottom--med">
					<span className="type--base type--wgt--medium type--color--opaque">Account number</span>
					<span className="type--base type--wgt--bold u-push">883220399</span>
				</div>
			</div>
		</div>
	);
};

export default defaultTemplate(PaycheckDirecktTemplate);

PaycheckDirecktTemplate.propTypes = {
	t: PropTypes.func,
};
