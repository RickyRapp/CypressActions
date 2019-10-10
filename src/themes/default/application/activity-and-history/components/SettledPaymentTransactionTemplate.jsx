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
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility} >
                </TableFilter>
            </div>
            <BaasicTable
                authorization={authorization}
                tableStore={tableStore}
            />
        </React.Fragment>
    )
}

SettledPaymentTransactionTemplate.propTypes = {
    settledPaymentTransactionViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(SettledPaymentTransactionTemplate);