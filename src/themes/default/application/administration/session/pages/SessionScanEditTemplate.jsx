import React from 'react';
import PropTypes from 'prop-types';
import {
    EmptyState,
    BaasicTable,
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { Content, PageFooter } from 'core/layouts';
import EmptyIcon from 'themes/assets/img/building-modern.svg';

const SessionScanEditTemplate = function ({ sessionScanEditViewStore, t }) {

    const {
        contentLoading,
        routes,
        authorization,
        tableStore,
    } = sessionScanEditViewStore;

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <div className="card--primary card--med">
                <BaasicTable
                    authorization={authorization}
                    tableStore={tableStore}
                />
            </div>
        </Content>
    )
};

SessionScanEditTemplate.propTypes = {
    sessionScanEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

export default defaultTemplate(SessionScanEditTemplate);
