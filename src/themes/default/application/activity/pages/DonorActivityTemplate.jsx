import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { DonorActivityListTemplate } from 'themes/application/activity/components';
import { Page } from 'core/layouts';

const DonorActivityTemplate = function ({ store }) {
    return (
        <Page>
            <DonorActivityListTemplate store={store} />
        </Page>
    )
};

DonorActivityTemplate.propTypes = {
    store: PropTypes.object.isRequired
};

export default defaultTemplate(DonorActivityTemplate);