import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationListLayout, Content } from 'core/layouts';
import { SimpleBaasicTable } from 'core/components';

const DonorInvestmentListTemplate = function ({ donorInvestmentViewStore }) {
    const {
        authorization,
        tableStore
    } = donorInvestmentViewStore;

    return (
        <ApplicationListLayout store={donorInvestmentViewStore} authorization={authorization}>
            <Content>
                <div className="card--primary card--med">
                    <SimpleBaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
        </ApplicationListLayout>
    )
};

DonorInvestmentListTemplate.propTypes = {
    donorInvestmentViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};


export default defaultTemplate(DonorInvestmentListTemplate);

