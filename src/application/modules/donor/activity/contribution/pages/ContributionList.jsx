import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionListTemplate } from 'themes/application/donor/activity/contribution/pages';
import { ContributionViewStore } from 'application/donor/activity/contribution/stores';

@setCurrentView((rootStore) => new ContributionViewStore(rootStore), 'contributionViewStore')
@observer
class ContributionList extends React.Component {
    render() {
        return <ContributionListTemplate {...this.props} />
    }
}

export default ContributionList;
