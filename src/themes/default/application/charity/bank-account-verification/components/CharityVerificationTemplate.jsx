import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { CharityBankAccountList } from 'application/charity/charity/components';

const CharityVerificationTemplate = function({ }) {
	return (
		<div className="card--med card--primary ">
			<p>Select Bank account to Verify or create new bank account: </p>
			<CharityBankAccountList />
        </div>
	);
};

CharityVerificationTemplate.propTypes = {
	t: PropTypes.func,
};

export default defaultTemplate(CharityVerificationTemplate);
