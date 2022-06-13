import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton
} from 'core/components';
import { CharityVerificationTab } from 'application/charity/charity/pages';

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
				<CharityVerificationTab />
			</div>
		</React.Fragment>
	);
};

CharityVerificationTemplate.propTypes = {
	t: PropTypes.func,
	charityVerificationViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(CharityVerificationTemplate);
