import React from 'react';
import { defaultTemplate } from 'core/hoc';
import DonorInvestmentList from './DonorInvestmentList';

function DonorInvestmentData({ donorId }) {
    return (
        <DonorInvestmentList donorId={donorId} />

    )
}

export default defaultTemplate(DonorInvestmentData);
