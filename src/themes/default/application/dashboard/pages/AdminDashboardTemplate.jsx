import React from 'react';
import { Page } from 'core/layouts';
import { BaasicButton, FormatterResolver } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

function AdminDashboardTemplate() {

    return (
        <Page >
            <div className="row">
                <div className="col col-sml-12 col-lrg-6">
                    Admin
                </div>
            </div>
        </Page>
    )
}

AdminDashboardTemplate.propTypes = {
};

export default defaultTemplate(AdminDashboardTemplate);
