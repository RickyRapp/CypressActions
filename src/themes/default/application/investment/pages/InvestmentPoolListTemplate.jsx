import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    EmptyState
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content } from 'core/layouts';

const InvestmentPoolListTemplate = function ({ investmentPoolViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = investmentPoolViewStore;

    return (
        <ApplicationListLayout store={investmentPoolViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
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
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='FUND_TRANSFER.LIST.EMPTY_STATE.TITLE' actionLabel='FUND_TRANSFER.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

InvestmentPoolListTemplate.propTypes = {
    investmentPoolViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(InvestmentPoolListTemplate);

