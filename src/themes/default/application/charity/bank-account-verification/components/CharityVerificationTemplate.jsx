import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { CharityBankAccountList } from 'application/charity/charity/components';
import {
	BaasicButton
} from 'core/components';

const CharityVerificationTemplate = function ({charityVerificationViewStore}) {
	const {charityLogout} = charityVerificationViewStore;

	return (
		<React.Fragment>
			<BaasicButton
				className='btn btn--med btn--primary u-mar--bottom--med'
				label='logout'
				onClick={charityLogout}
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
	charityVerificationViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(CharityVerificationTemplate);
