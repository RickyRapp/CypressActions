import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, ListContent } from 'core/components';

const InvestmentPoolHistoryTemplate = function ({ investmentPoolHistoryViewStore }) {
    const {
        tableStore,
        authorization
    } = investmentPoolHistoryViewStore;

    return (
        <ListContent store={investmentPoolHistoryViewStore} authorization={authorization}>
            <div className="card--form card--primary card--med">
                <BaasicTable
                    authorization={authorization}
                    tableStore={tableStore}
                />
            </div>
        </ListContent>
    )
};

InvestmentPoolHistoryTemplate.propTypes = {
    investmentPoolHistoryViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(InvestmentPoolHistoryTemplate);

