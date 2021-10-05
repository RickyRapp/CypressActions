import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    BaasicDropdown
} from 'core/components';
import { Content } from 'core/layouts';

const GrantsListTemplate = function ({ grantsViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        donationTypeDropdownStore,
        donationStatusDropdownStore
    } = grantsViewStore;

    return (
        <Content>
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

GrantsListTemplate.propTypes = {
    grantsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantsListTemplate);

