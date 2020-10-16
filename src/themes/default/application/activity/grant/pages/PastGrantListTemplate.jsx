import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';

const PastGrantListTemplate = function ({ pastGrantViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        charityDropdownStore,
        donationTypeDropdownStore,
        donationStatusDropdownStore
    } = pastGrantViewStore;

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <div className="card--form card--secondary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={charityDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationTypeDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationStatusDropdownStore} />
                    </div>
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
    return <EmptyState image={EmptyIcon} title='DONATION.LIST.EMPTY_STATE.TITLE' actionLabel='DONATION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

PastGrantListTemplate.propTypes = {
    pastGrantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(PastGrantListTemplate);

