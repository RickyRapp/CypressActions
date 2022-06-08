import React from 'react';
import { defaultTemplate } from 'core/hoc';
import {
    DonorThirdPartyWebsiteSetting,
    DonorCertificateSetting
} from 'application/administration/donor/components';
import { DonorGivingCardSettingList } from 'application/administration/donor/components';

function DonorSecurityAndPreferencesData() {
    return (
        <div className="u-mar--bottom--med">
            <div className="row">
            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <DonorThirdPartyWebsiteSetting />
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <DonorThirdPartyWebsiteSetting />
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <DonorCertificateSetting />
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <DonorGivingCardSettingList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default defaultTemplate(DonorSecurityAndPreferencesData);
