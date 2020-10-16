import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, DateRangeQueryPicker, TableFilter } from 'core/components';

function TransactionTemplate({ transactionViewStore }) {
    const {
        tableStore,
        dateCreatedDateRangeQueryStore,
        queryUtility
    } = transactionViewStore

    return (
        <div>
            <div className="card--form card--secondary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} >
                    <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                        <DateRangeQueryPicker
                            queryUtility={queryUtility}
                            store={dateCreatedDateRangeQueryStore}
                        />
                    </div>
                </TableFilter>
            </div>
            <div className="card--form card--primary card--med">
                <h3 className="u-mar--bottom--med"></h3>
                <BaasicTable
                    tableStore={tableStore}
                />
            </div>
        </div >
    );
}

TransactionTemplate.propTypes = {
    transactionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(TransactionTemplate);