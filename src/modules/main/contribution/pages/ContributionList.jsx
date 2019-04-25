import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionListTemplate } from 'themes/modules/main/contribution/pages';
import { ContributionListViewStore } from 'modules/main/contribution/stores';

@setCurrentView(rootStore => new ContributionListViewStore(rootStore), 'contributionListViewStore')
@observer
class ContributionList extends React.Component {
    render() {
        return <ContributionListTemplate {...this.props} />;
    }
}

export default ContributionList;