import React from 'react';
import { defaultTemplate } from 'core/hoc';
import DonorInvestmentList from './DonorInvestmentList';
import PropTypes from 'prop-types';

function DonorInvestmentData({ donorId }) {
    return (
        <DonorInvestmentList donorId={donorId} />

    )
}

DonorInvestmentData.propTypes = {
    donorId: PropTypes.string.isRequired
};

export default defaultTemplate(DonorInvestmentData);