import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter
} from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';

const CharityCertificatesListTemplate = function ({ charityCertificatesViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization
    } = charityCertificatesViewStore;

    return (
        <ApplicationListLayout store={charityCertificatesViewStore} authorization={authorization}>
            <Content>
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

CharityCertificatesListTemplate.propTypes = {
    charityCertificatesViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityCertificatesListTemplate);

