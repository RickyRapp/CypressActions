import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const ACHTemplate = ({ bankAccount, t }) => {
	return (
		<React.Fragment>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">
					{t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NAME')}
				</span>
				<span className="type--base type--wgt--bold u-push">{bankAccount.name}</span>
			</div>
            
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">
					{t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NUMBER')}
				</span>
				<span className="type--base type--wgt--bold u-push">{bankAccount.accountNumber}</span>
			</div>
		</React.Fragment>
	);
};

export default defaultTemplate(ACHTemplate);

ACHTemplate.propTypes = {
    t: PropTypes.func,
    bankAccount: PropTypes.any,
};
