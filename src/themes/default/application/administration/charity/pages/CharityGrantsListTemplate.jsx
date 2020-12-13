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

const CharityGrantsListTemplate = function ({ charityGrantsViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization } = charityGrantsViewStore;

    return (
        <ApplicationListLayout store={charityGrantsViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                    </TableFilter>
                </div>
                <div className="card--primary card--med">
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
    return <EmptyState image={EmptyIcon} title='CHARITY.LIST.EMPTY_STATE.TITLE' actionLabel='CHARITY.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CharityGrantsListTemplate.propTypes = {
    charityGrantsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityGrantsListTemplate);

