import React from 'react';
import { PageHeader } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import { AccountManager } from 'application/donor/components';

function DashboardHeaderTemplate(props) {
    const { rootStore } = props;

    return (
        <PageHeader>
            {rootStore.userStore.user && rootStore.userStore.user.donor ? (
                <React.Fragment>
                    <span>
                        <span>{rootStore.userStore.user.donor.fundName}</span>
                        <span>
                            Account#: <strong>{rootStore.userStore.user.donor.accountNumber}</strong>
                        </span>
                    </span>
                    <AccountManager />
                </React.Fragment >)
                : null}
        </PageHeader>
    )
}

DashboardHeaderTemplate.propTypes = {
};

export default defaultTemplate(DashboardHeaderTemplate);
