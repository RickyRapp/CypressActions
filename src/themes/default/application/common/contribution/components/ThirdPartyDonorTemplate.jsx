import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const ThirdPartyDonorTemplate = ({ bankAccount, t }) => {
	return (
		<React.Fragment>
			<div className="u-mar--bottom--med">
				<div className="card--column--med">
					<span className="type--base type--wgt--medium type--color--opaque">Charity name</span>
					<span className="type--base type--wgt--bold u-push">The Donors Fund</span>
				</div>
				<div className="card--column--med">
					<span className="type--base type--wgt--medium type--color--opaque">EIN (tax ID)</span>
					<span className="type--base type--wgt--bold u-push">47-4844275</span>
				</div>
				<div className="card--column--med">
					<span className="type--base type--wgt--medium type--color--opaque">Address</span>
					<span className="type--base type--wgt--bold u-push">{t('MAILING_ADDRESS')}</span>
				</div>
				<div className="u-mar--bottom--med">
					<span className="type--base type--wgt--medium type--color--opaque">Memo for purpose of grant</span>
					<span className="type--base type--wgt--bold u-push">
						{bankAccount ? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx(your full account number)'}{' '}
					</span>
				</div>
			</div>
		</React.Fragment>
	);
};

export default defaultTemplate(ThirdPartyDonorTemplate);

ThirdPartyDonorTemplate.propTypes = {
	bankAccount: PropTypes.any,
	t: PropTypes.func,
};
