import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter
} from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';

const CharityProcessedDonationTemplate = function ({ charityProcessedDonationViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization
    } = charityProcessedDonationViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={charityProcessedDonationViewStore} authorization={authorization}>
                <Content >
                    <div className="card--tertiary card--med u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
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
        </React.Fragment>
    )
};

CharityProcessedDonationTemplate.propTypes = {
    charityProcessedDonationViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityProcessedDonationTemplate);

