import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionCreateTemplate } from 'themes/application/administration/contribution/pages';
import { ContributionCreateViewStore } from 'application/common/contribution/stores';

@setCurrentView((rootStore) => new ContributionCreateViewStore(rootStore, { donorId: rootStore.routerStore.routerState.params.id, contributionStore: rootStore.application.administration.contributionStore }), 'contributionCreateViewStore')
@observer
class ContributionCreate extends React.Component {
    render() {
        return <ContributionCreateTemplate {...this.props} />
    }
}

export default ContributionCreate;
