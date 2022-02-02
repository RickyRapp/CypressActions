import React from 'react';

const ProgressLineTemplate = () => {
    const grantThisYearItem = localStorage.getItem('grantsThisYear');
    const totalGoalItem = parseFloat(localStorage.getItem('totalGoal'));

    const labelVisual = (e) => {
        return `$${e.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    let progressTotal = null;
    let progressBarClassName = "";

    if (!(typeof totalGoalItem == 'undefined')) {
        if (isNaN(grantThisYearItem / totalGoalItem)) {
            progressTotal = totalGoalItem
        } else if (((grantThisYearItem / totalGoalItem) * 100).toFixed(2) >= 100) {
            progressTotal = 100;
        } else {
            progressTotal = ((grantThisYearItem / totalGoalItem) * 100).toFixed(2)
        }
    }

    if (isNaN(grantThisYearItem / totalGoalItem * 100) || ((grantThisYearItem / totalGoalItem) * 100).toFixed(2) >= 100) {
        progressBarClassName = " progressbar__progress--rounded"
    }

    return (
        <div className="progressbar">
            <p className="progressbar__label">Amount given this year:</p>
            <div className="progressbar__body">
                <div style={{ 'width': `${progressTotal}%` }} className={`progressbar__progress${progressBarClassName}`}>
                </div>
            </div>
            <div>
                <span className="type--base type--wgt--bold type--color--primary">
                    {progressTotal}%
                </span>

                <span className="type--base type--wgt--bold type--color--opaque u-push">
                    {labelVisual(totalGoalItem)}
                </span>
            </div>
        </div>
    );
};

export default ProgressLineTemplate;

