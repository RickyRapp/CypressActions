import React from 'react';
import { localStorageProvider } from 'core/providers';

const ProgressLineTemplate = () => {
    const grantThisYear = localStorageProvider.get('grantsThisYear');
    const totalGoal = localStorageProvider.get('totalGoal');

    const grantThisYearItem = localStorage.getItem('grantsThisYear');
    const totalGoalItem = localStorage.getItem('totalGoal');

    let progressWidth = ((grantThisYear / totalGoal) * 100).toFixed(2)

    if (!(typeof totalGoalItem == 'undefined' || totalGoalItem == 0)) {
        if (((grantThisYearItem / totalGoalItem) * 100).toFixed(2) >= 100) {
            progressWidth = 100;
        } else {
            progressWidth = (isNaN(grantThisYearItem / totalGoalItem) ? null : ((grantThisYearItem / totalGoalItem) * 100).toFixed(2))
        }
    }

    let progressBarClassName = "";
    if (isNaN(grantThisYearItem / totalGoalItem * 100) || ((grantThisYearItem / totalGoalItem) * 100).toFixed(2) >= 100) {
        progressBarClassName = " progressbar__progress--rounded"
    }

    return (
        <div className="progressbar">
            {/* <p className="progressbar__label">{t('DONATION.PAST_GRANT.LIST.SUMMARY.PROGRESSBAR_TITLE')}</p> */}
            <p className="progressbar__label">Amount given this year:</p>
            <div className="progressbar__body">
                <div style={{ 'width': `${progressWidth}%` }} className={`progressbar__progress${progressBarClassName}`}>
                </div>
            </div>
            <div>
                <span className="type--base type--wgt--bold type--color--primary">
                    {!(typeof totalGoalItem == 'undefined' || totalGoalItem == 0) && (((grantThisYearItem / totalGoalItem) * 100).toFixed(2) >= 100 ? 100 : (isNaN(grantThisYearItem / totalGoalItem) ? null : ((grantThisYearItem / totalGoalItem) * 100).toFixed(2)))}
                    {!(typeof totalGoalItem == 'undefined' || totalGoalItem == 0) && !isNaN(grantThisYearItem / totalGoalItem) ? '%' : null}
                </span>

                <span className="type--base type--wgt--bold type--color--opaque u-push">
                    ${totalGoal}
                </span>
            </div>
        </div>
    );
};

export default ProgressLineTemplate;

