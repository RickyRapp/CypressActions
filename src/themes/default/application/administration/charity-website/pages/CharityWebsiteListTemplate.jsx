import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    BaasicModal
} from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';
import { CharityWebsiteCreate } from 'application/administration/charity-website/components';

const CharityWebsiteListTemplate = function ({ charityWebsiteViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        createModal
    } = charityWebsiteViewStore;

    return (
        <ApplicationListLayout store={charityWebsiteViewStore} authorization={authorization}>
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
            <BaasicModal modalParams={createModal}>
                <CharityWebsiteCreate />
            </BaasicModal>
        </ApplicationListLayout>
    )
};

CharityWebsiteListTemplate.propTypes = {
    charityWebsiteViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityWebsiteListTemplate);

