import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    BaasicDropdown
} from 'core/components';
import { Content } from 'core/layouts';

const AllTransactionListTemplate = function ({ allTransactionViewStore, hideSearch }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        donationTypeDropdownStore,
        donationStatusDropdownStore
    } = allTransactionViewStore;

    return (
        <Content>
            { !hideSearch && (
                <div className="card--tertiary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationTypeDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationStatusDropdownStore} />
                    </div>
                </TableFilter>
            </div>
            )}
            
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                        />
                    </div>
                </div>
            </div>
        </Content>
    )
};

AllTransactionListTemplate.propTypes = {
    allTransactionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
    hideSearch: PropTypes.bool
};

export default defaultTemplate(AllTransactionListTemplate);

