import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    DonorAutomaticContributionSetting,
    DonorThirdPartyWebsiteSetting,
    DonorCertificateSetting
} from 'application/donor/components';

function DonorSecurityAndPreferencesData({ donorId }) {
    return (
        <div className="card--primary card--med">
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
            </div>
        </div>
    )
}

DonorSecurityAndPreferencesData.propTypes = {
    donorId: PropTypes.string.isRequired
};

export default defaultTemplate(DonorSecurityAndPreferencesData);
