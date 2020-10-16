import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter
} from 'core/components';
import { Content } from 'core/layouts';

const FundTransferListTemplate = function ({ fundTransferViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization
    } = fundTransferViewStore;

    return (
        <Content>
            <div className="card--form card--secondary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} >
                </TableFilter>
            </div>
            <div className="card--form card--primary card--med">
                <BaasicTable
                    authorization={authorization}
                    tableStore={tableStore}
                />
            </div>
        </Content>
    )
};

FundTransferListTemplate.propTypes = {
    fundTransferViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(FundTransferListTemplate);

