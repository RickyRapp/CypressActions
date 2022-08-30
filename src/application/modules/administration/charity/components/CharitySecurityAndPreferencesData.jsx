import React from 'react';
import { defaultTemplate } from 'core/hoc';
import CharityPaymentOptions from './CharityPaymentOptions';

function CharitySecurityAndPreferencesData() {
	return (
		<div className="u-mar--bottom--med">
			<CharityPaymentOptions />
		</div>
	);
}

export default defaultTemplate(CharitySecurityAndPreferencesData);
