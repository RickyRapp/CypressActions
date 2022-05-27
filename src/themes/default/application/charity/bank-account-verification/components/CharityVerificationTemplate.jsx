import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { CharityBankAccountList } from 'application/charity/charity/components';
import {
	BaasicButton
} from 'core/components';

const CharityVerificationTemplate = function () {
	return (
		<React.Fragment>
			<BaasicButton
				className='btn btn--med btn--primary u-mar--bottom--med'
				label='logout'
			/>
			<div className="card--med card--primary ">
				<p>Select Bank account to Verify or create new bank account: </p>
				<CharityBankAccountList />
			</div>
		</React.Fragment>
	);
};

CharityVerificationTemplate.propTypes = {
	t: PropTypes.func,
};

export default defaultTemplate(CharityVerificationTemplate);
