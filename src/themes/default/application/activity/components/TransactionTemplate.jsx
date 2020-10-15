import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown, BaasicTable, DateRangeQueryPicker, TableFilter } from 'core/components';

function TransactionTemplate({ transactionViewStore, rootStore }) {
    const {
        tableStore,
        dateCreatedDateRangeQueryStore,
        searchDonorDropdownStore,
        queryUtility
    } = transactionViewStore

    const {
        permissionStore
    } = rootStore

    return (
        <div>
            <div className="card--form card--secondary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} >
                    {permissionStore.hasPermission('theDonorsFundAdministrationSection.read') &&
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown store={searchDonorDropdownStore} />
                        </div>}
                    <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                        <DateRangeQueryPicker
                            queryUtility={queryUtility}
                            store={dateCreatedDateRangeQueryStore}
                            fromPropertyName='dateCreatedFrom'
                            toPropertyName='dateCreatedTo'
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
    t: PropTypes.func.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(TransactionTemplate);