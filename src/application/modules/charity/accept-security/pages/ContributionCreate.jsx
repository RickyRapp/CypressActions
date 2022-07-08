import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionCreateTemplate } from 'themes/application/charity/accept-security/pages';
import { ContributionCreateViewStore } from 'application/charity/accept-security/stores';

@setCurrentView((rootStore) => new ContributionCreateViewStore(rootStore, { donorId: rootStore.userStore.applicationUser.id, contributionStore: rootStore.application.donor.contributionStore }), 'store')
@observer
class ContributionCreate extends React.Component {
    render() {
        return <ContributionCreateTemplate {...this.props} />
    }
}

export default ContributionCreate;
