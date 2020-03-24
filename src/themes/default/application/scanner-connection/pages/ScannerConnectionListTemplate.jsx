import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    EmptyState
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';

const ScannerConnectionListTemplate = function ({ scannerConnectionViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = scannerConnectionViewStore;

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <div className="u-mar--bottom--sml">
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

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SCANNER_CONNECTION.LIST.EMPTY_STATE.TITLE' actionLabel='SCANNER_CONNECTION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

ScannerConnectionListTemplate.propTypes = {
    scannerConnectionViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ScannerConnectionListTemplate);

