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

const CheckListTemplate = function ({ checkViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = checkViewStore;

    return (
        <ApplicationListLayout store={checkViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
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
    return <EmptyState image={EmptyIcon} title='CHECK.LIST.EMPTY_STATE.TITLE' actionLabel='CHECK.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CheckListTemplate.propTypes = {
    checkViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CheckListTemplate);

