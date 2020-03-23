import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import CharityActivityAndHistoryListTemplate from 'themes/application/activity-and-history/components';
import { Page } from 'core/layouts';

const CharityActivityAndHistoryTemplate = function ({ store }) {

    return (
        <Page>
        <CharityActivityAndHistoryListTemplate store={store} />
    </Page>
    )
};

CharityActivityAndHistoryTemplate.propTypes = {
    store: PropTypes.object.isRequired
};

export default defaultTemplate(CharityActivityAndHistoryTemplate);