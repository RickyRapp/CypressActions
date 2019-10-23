import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, TableFilter } from 'core/components';

const SettledPaymentTransactionTemplate = function ({ settledPaymentTransactionViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization
    } = settledPaymentTransactionViewStore;

    return (
        <React.Fragment>
            <div className="u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} >
                </TableFilter>
            </div>
            <div className="card--form card--primary card--med">
                <h3 className="u-mar--bottom--med">Settled transactions</h3>
                <BaasicTable
                    authorization={authorization}
                    tableStore={tableStore}
                />
            </div>
        </React.Fragment>
    )
}

SettledPaymentTransactionTemplate.propTypes = {
    settledPaymentTransactionViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(SettledPaymentTransactionTemplate);