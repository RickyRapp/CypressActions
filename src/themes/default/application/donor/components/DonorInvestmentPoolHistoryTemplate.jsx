import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    ListContent
} from 'core/components';
import { Content } from 'core/layouts';

const DonorInvestmentPoolHistoryTemplate = function ({ donorInvestmentPoolHistoryViewStore }) {
    const {
        tableStore,
        authorization
    } = donorInvestmentPoolHistoryViewStore;

    return (
        <ListContent>
            <Content >
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
        </ListContent>
    )
};

DonorInvestmentPoolHistoryTemplate.propTypes = {
    donorInvestmentPoolHistoryViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorInvestmentPoolHistoryTemplate);

