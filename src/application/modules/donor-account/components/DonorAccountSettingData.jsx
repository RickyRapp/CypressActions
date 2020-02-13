import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    DonorAccountAutomaticContributionSetting,
    DonorAccountThirdPartyWebsiteSetting,
    DonorAccountCertificateSetting
} from 'application/donor-account/components';

function DonorAccountSettingDataTemplate() {
    return (
        <div className="card--form card--primary card--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountAutomaticContributionSetting />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountThirdPartyWebsiteSetting />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountCertificateSetting />
                </div>
            </div>
        </div>
    )
}

DonorAccountSettingDataTemplate.propTypes = {
    t: PropTypes.func
};

export default defaultTemplate(DonorAccountSettingDataTemplate);
