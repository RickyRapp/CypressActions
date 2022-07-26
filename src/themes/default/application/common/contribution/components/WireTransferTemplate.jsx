import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const WireTransferTemplate = ({ bankAccount, t }) => {
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
				<span className="type--base type--wgt--medium type--color--opaque">Beneficiary bank</span>
				<span className="type--base type--wgt--bold u-push">JP Morgan Chase</span>
			</div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">ABA (routing number)</span>
				<span className="type--base type--wgt--bold u-push">021000021</span>
			</div>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">Account number</span>
				<span className="type--base type--wgt--bold u-push">883220399</span>
			</div>
			<div className="u-mar--bottom--med">
				<span className="type--base type--wgt--medium type--color--opaque">Wire Memo</span>
				<span className="type--base type--wgt--bold u-push">
					{bankAccount ? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx'} (your full account number goes here)
				</span>
			</div>
		</React.Fragment>
	);
};

export default defaultTemplate(WireTransferTemplate);

WireTransferTemplate.propTypes = {
	bankAccount: PropTypes.any,
	clipboardText: PropTypes.string,
	downloadTxtFile: PropTypes.func,
	t: PropTypes.func,
	form: PropTypes.object,
	paymentType: PropTypes.object,
};
