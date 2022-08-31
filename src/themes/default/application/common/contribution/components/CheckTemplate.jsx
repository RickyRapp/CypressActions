import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const CheckTemplate = ({ bankAccount, t }) => {
	return (
		<div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">Make checks payable to</span>
				<span className="type--base type--wgt--bold u-push">The Donors Fund</span>
			</div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">Mail to</span>
				<span className="type--base type--wgt--bold u-push">{t('MAILING_ADDRESS')}</span>
			</div>
			<div className="u-mar--bottom--med">
				<span className="type--base type--wgt--medium type--color--opaque">Check Memo</span>
				<span className="type--base type--wgt--bold u-push">
					{bankAccount ? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx(your full account number)'}{' '}
				</span>
			</div>
		</div>
	);
};

export default defaultTemplate(CheckTemplate);

CheckTemplate.propTypes = {
	bankAccount: PropTypes.any,
	t: PropTypes.func,
};
