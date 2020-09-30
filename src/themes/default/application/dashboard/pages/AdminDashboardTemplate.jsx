import React from 'react';
import { Page } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';

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
