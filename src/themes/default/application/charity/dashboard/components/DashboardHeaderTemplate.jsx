import React from 'react';
import { PageHeader } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

function DashboardHeaderTemplate(props) {
    const { rootStore } = props;

    return (
        <PageHeader>
            {rootStore.userStore.user && rootStore.userStore.user.charity ? (
                <React.Fragment>
                    <div className="col col-sml-12">
                        <span className="header__profile__title">{rootStore.userStore.user.charity.name}</span>
                        <p className="header__profile__label">
                            Tax ID: <span className="type--wgt--bold">{rootStore.userStore.user.charity.taxId}</span>
                        </p>
                        <p className="header__profile__label">
                            Api Key: <span className="type--wgt--bold">{rootStore.userStore.user.charity.apiKey}</span>
                        </p>
                    </div>
                </React.Fragment >)
                : null}
        </PageHeader>
    )
}

DashboardHeaderTemplate.propTypes = {
    rootStore: PropTypes.object
};

export default defaultTemplate(DashboardHeaderTemplate);
