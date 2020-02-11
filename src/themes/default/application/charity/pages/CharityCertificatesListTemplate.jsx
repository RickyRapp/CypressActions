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

const CharityCertificatesListTemplate = function ({ charityCertificatesViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = charityCertificatesViewStore;

    return (
        <ApplicationListLayout store={charityCertificatesViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
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
    return <EmptyState image={EmptyIcon} title='CHARITY_CERTIFICATES.LIST.EMPTY_STATE.TITLE' actionLabel='CHARITY_CERTIFICATES.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CharityCertificatesListTemplate.propTypes = {
    charityCertificatesViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityCertificatesListTemplate);

