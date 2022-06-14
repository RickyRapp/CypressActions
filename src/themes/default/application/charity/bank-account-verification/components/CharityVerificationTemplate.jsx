import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton
} from 'core/components';
import { CharityVerificationTab } from 'application/charity/charity/pages';
import logo from 'themes/assets/img/logo.svg';

const CharityVerificationTemplate = function ({charityVerificationViewStore}) {
	const {charityLogout} = charityVerificationViewStore;

	return (
		<div className='container container--base'>
			<div className='header--verify u-mar--bottom--med'>
				<img src={logo} alt={"logo"} />
			
				<BaasicButton
					className='btn btn--med btn--primary'
					label='logout'
					onClick={charityLogout}
				/>
			</div>
			<div className="card--med card--primary ">
				<CharityVerificationTab />
			</div>
		</div>
	);
};

CharityVerificationTemplate.propTypes = {
	t: PropTypes.func,
	charityVerificationViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(CharityVerificationTemplate);
