import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicModal
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content } from 'core/layouts';
import { ThirdPartyWebsiteCreate } from 'application/third-party-website/components';

const ThirdPartyWebsiteListTemplate = function ({ thirdPartyWebsiteViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        createModal
    } = thirdPartyWebsiteViewStore;

    return (
        <ApplicationListLayout store={thirdPartyWebsiteViewStore} authorization={authorization}>
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
            <BaasicModal modalParams={createModal}>
                <ThirdPartyWebsiteCreate />
            </BaasicModal>
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='THIRD_PARTY_WEBSITE.LIST.EMPTY_STATE.TITLE' actionLabel='THIRD_PARTY_WEBSITE.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

ThirdPartyWebsiteListTemplate.propTypes = {
    thirdPartyWebsiteViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ThirdPartyWebsiteListTemplate);

