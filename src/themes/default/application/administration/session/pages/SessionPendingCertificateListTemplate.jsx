import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    EmptyState
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';

const SessionPendingCertificateListTemplate = function ({ sessionPendingCertificateViewStore }) {
    const {
        tableStore,
        routes,
        authorization
    } = sessionPendingCertificateViewStore;

    return (
        <React.Fragment>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

SessionPendingCertificateListTemplate.propTypes = {
    sessionPendingCertificateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(SessionPendingCertificateListTemplate);

