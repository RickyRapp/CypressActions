import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { DonorActivityAndHistoryListTemplate } from 'themes/application/activity-and-history/components';
import { Page } from 'core/layouts';

const DonorActivityAndHistoryTemplate = function ({ store }) {
    return (
        <Page>
            <DonorActivityAndHistoryListTemplate store={store} />
        </Page>
    )
};

DonorActivityAndHistoryTemplate.propTypes = {
    store: PropTypes.object.isRequired
};

export default defaultTemplate(DonorActivityAndHistoryTemplate);