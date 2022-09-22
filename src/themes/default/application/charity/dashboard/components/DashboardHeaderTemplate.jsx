import React from 'react';
import { PageHeader } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

function DashboardHeaderTemplate(props) {
    const { rootStore } = props;

    return (
        <PageHeader>
            {rootStore.userStore.user && rootStore.userStore.user.charity ? (
                <div className="header__profile__wrapper">
                    {rootStore.userStore.user.charity.logo && (
                        <div className="header__profile__logo">
                            <img className="" alt="" src={URL.createObjectURL(rootStore.userStore.user.charity.logo)} />
                        </div>
                    )}

                    <div>
                        <p className="header__profile__title">{rootStore.userStore.user.charity.name}</p>
                        <p className="header__profile__label">
                            Tax Id: <span className="type--wgt--bold">{rootStore.userStore.user.charity.taxId}</span>
                        </p>
                        <p className="header__profile__label">
                            Account Number: <span className="type--wgt--bold">{rootStore.userStore.user.charity.accountNumber}</span>
                        </p>
                    </div>
                </div>)
                : null}
        </PageHeader>
    )
}

DashboardHeaderTemplate.propTypes = {
    rootStore: PropTypes.object
};

export default defaultTemplate(DashboardHeaderTemplate);
