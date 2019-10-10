import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, TableFilter } from 'core/components';

const ReservedPaymentTransactionTemplate = function ({ reservedPaymentTransactionViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization
    } = reservedPaymentTransactionViewStore;

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

ReservedPaymentTransactionTemplate.propTypes = {
    reservedPaymentTransactionViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ReservedPaymentTransactionTemplate);