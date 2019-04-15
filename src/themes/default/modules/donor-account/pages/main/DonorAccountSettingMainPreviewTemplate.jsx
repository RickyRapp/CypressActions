import React from 'react';
import { defaultTemplate } from 'core/utils';

function DonorAccountSettingMainPreviewTemplate({ donorAccountSettingMainPreviewViewStore }) {
    const { settings } = donorAccountSettingMainPreviewViewStore;

    return (
        <React.Fragment>
            <h3>Account Settings</h3>

            {settings &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={settings.lineOfCredit}>Line Of Credit</label>
                            {settings.lineOfCredit}
                        </div>
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label>Initial Contribution</label>
                            {settings.initialContribution ? 'Yes' : 'No'}
                        </div>
                    </div>
                    {!settings.initialContribution &&
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label htmlFor={settings.contributionMinimumInitial}>Contribution Minimum Initial</label>
                                {settings.contributionMinimumInitial}
                            </div>
                        </div>}
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={settings.contributionMinimumAdditional}>Contribution Minimum Additional</label>
                            {settings.contributionMinimumAdditional}
                        </div>
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={settings.grantFee}>Grant Fee</label>
                            {settings.grantFee}
                        </div>
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={settings.certificateDeduction}>Certificate Deduction</label>
                            {settings.certificateDeduction}
                        </div>
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={settings.certificateFee}>Certificate Fee</label>
                            {settings.certificateFee}
                        </div>
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={settings.extraBookletPercentage}>Extra Booklet Percentage</label>
                            {settings.extraBookletPercentage}
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountSettingMainPreviewTemplate);
