import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    ListContent
} from 'core/components';
import { Content } from 'core/layouts';

const DonorAccountInvestmentPoolHistoryTemplate = function ({ donorAccountInvestmentPoolHistoryViewStore }) {
    const {
        tableStore,
        authorization
    } = donorAccountInvestmentPoolHistoryViewStore;

    return (
        <ListContent>
            <Content >
                <div className="card--form card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
        </ListContent>
    )
};

DonorAccountInvestmentPoolHistoryTemplate.propTypes = {
    donorAccountInvestmentPoolHistoryViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAccountInvestmentPoolHistoryTemplate);

