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
                    <div>
                        <span className="type--med type--wgt--medium">{rootStore.userStore.user.donor.fundName}</span>
                        <p className="type--base type--color--opaque">
                            Account Number: <span className="type--wgt--bold">{rootStore.userStore.user.donor.accountNumber}</span>
                        </p>
                    </div>
                    <AccountManager />
                </React.Fragment >)
                : null}
        </PageHeader>
    )
}

DashboardHeaderTemplate.propTypes = {
};

export default defaultTemplate(DashboardHeaderTemplate);
