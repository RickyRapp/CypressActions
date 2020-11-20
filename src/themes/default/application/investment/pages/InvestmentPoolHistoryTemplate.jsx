import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, ListContent } from 'core/components';

const InvestmentPoolHistoryTemplate = function ({ investmentPoolHistoryViewStore, t }) {
    const {
        tableStore,
        authorization
    } = investmentPoolHistoryViewStore;

    return (
        <ListContent store={investmentPoolHistoryViewStore} authorization={authorization}>
            <div className="card--primary card--med">
                <h5 className="type--med type--wgt--medium u-mar--bottom--sml">{t('INVESTMENT_POOL.LIST.HISTORY_TITLE')}</h5>
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

