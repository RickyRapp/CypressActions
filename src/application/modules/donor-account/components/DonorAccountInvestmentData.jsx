import React from 'react';
import { defaultTemplate } from 'core/hoc';
import DonorAccountInvestmentList from './DonorAccountInvestmentList';

function DonorAccountInvestmentData() {
    return (
        <React.Fragment>
            <DonorAccountInvestmentList />
        </React.Fragment>

    )
}

export default defaultTemplate(DonorAccountInvestmentData);
