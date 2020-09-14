import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    DonorAutomaticContributionSetting,
    DonorThirdPartyWebsiteSetting,
    DonorCertificateSetting,
    DonorContributionSetting,
    DonorAccountSetting
} from 'application/donor/components';

function DonorSettingDataTemplate({ donorId }) {
    return (
        <div className="card--form card--primary card--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAutomaticContributionSetting donorId={donorId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorThirdPartyWebsiteSetting donorId={donorId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorCertificateSetting donorId={donorId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorContributionSetting donorId={donorId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountSetting donorId={donorId} />
                </div>
            </div>
        </div>
    )
}

DonorSettingDataTemplate.propTypes = {
    t: PropTypes.func
};

export default defaultTemplate(DonorSettingDataTemplate);
