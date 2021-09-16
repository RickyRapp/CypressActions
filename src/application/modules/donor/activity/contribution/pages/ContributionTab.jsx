import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionTabTemplate } from 'themes/application/donor/activity/contribution/pages';
import { ContributionTabViewStore } from 'application/donor/activity/contribution/stores';

@setCurrentView((rootStore) => new ContributionTabViewStore(rootStore), 'contributionTabViewStore')
@observer
class ContributionTab extends React.Component {
    render() {
        return <ContributionTabTemplate {...this.props} />
    }
}

export default ContributionTab;
