import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { CharityActivityListTemplate } from 'themes/application/activity/components';
import { Page } from 'core/layouts';

const CharityActivityTemplate = function ({ store }) {

    return (
        <Page>
            <CharityActivityListTemplate store={store} />
        </Page>
    )
};

CharityActivityTemplate.propTypes = {
    store: PropTypes.object.isRequired
};

export default defaultTemplate(CharityActivityTemplate);