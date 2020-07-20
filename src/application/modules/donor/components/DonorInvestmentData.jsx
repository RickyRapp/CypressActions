import React from 'react';
import { defaultTemplate } from 'core/hoc';
import DonorInvestmentList from './DonorInvestmentList';

function DonorInvestmentData() {
    return (
        <React.Fragment>
            <DonorInvestmentList />
        </React.Fragment>

    )
}

export default defaultTemplate(DonorInvestmentData);
