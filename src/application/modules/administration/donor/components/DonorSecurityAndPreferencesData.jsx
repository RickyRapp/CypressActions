import React from 'react';
import { defaultTemplate } from 'core/hoc';
import {
	DonorThirdPartyWebsiteSetting,
	DonorCertificateSetting,
	DonorOnlineGrantSetting,
} from 'application/administration/donor/components';
import { DonorGivingCardSettingList } from 'application/administration/donor/components';

function DonorSecurityAndPreferencesData() {
	return (
		<div className="u-mar--bottom--med">
			<div className="u-mar--bottom--med">
				<div className="card--primary card--med">
					<DonorOnlineGrantSetting />
				</div>
			</div>
			<div className="u-mar--bottom--med">
				<div className="card--primary card--med">
					<DonorThirdPartyWebsiteSetting />
				</div>
			</div>
			<div className="u-mar--bottom--med">
				<div className="card--primary card--med">
					<DonorCertificateSetting />
				</div>
			</div>
			<div className="">
				<div className="card--primary card--med">
					<DonorGivingCardSettingList />
				</div>
			</div>
		</div>
	);
}

export default defaultTemplate(DonorSecurityAndPreferencesData);
