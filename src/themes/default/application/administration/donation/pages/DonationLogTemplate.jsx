import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
} from 'core/components';
import { Content } from 'core/layouts';

function DonationLogTemplate({ donationLogViewStore, t }) {
    const {
        tableStore,
        authorization,
        renderActions
    } = donationLogViewStore;

    return (
        <Content>
            <div>
                <BaasicTable 
                    authorization={authorization} 
                    tableStore={tableStore} 
                />
            </div>
        </Content>
    )
}

DonationLogTemplate.propTypes = {
    donationLogViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonationLogTemplate);
