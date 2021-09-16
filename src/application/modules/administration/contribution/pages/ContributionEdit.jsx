import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionEditTemplate } from 'themes/application/administration/contribution/pages';
import { ContributionEditViewStore } from 'application/common/contribution/stores';

@setCurrentView((rootStore) => new ContributionEditViewStore(rootStore, { contributionStore: rootStore.application.donor.contributionStore, step: 2 }), 'store')
@observer
class ContributionEdit extends React.Component {
    render() {
        return <ContributionEditTemplate {...this.props} />
    }
}

export default ContributionEdit;
