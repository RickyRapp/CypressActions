import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionCreateTemplate } from 'themes/application/charity/accept-security/pages';
import { ContributionEditViewStore } from 'application/charity/accept-security/stores';

@setCurrentView((rootStore) => new ContributionEditViewStore(rootStore, { contributionStore: rootStore.application.donor.contributionStore, step: 2 }), 'store')
@observer
class ContributionEdit extends React.Component {
    render() {
        return <ContributionCreateTemplate {...this.props} />
    }
}

export default ContributionEdit;
