import React from 'react';
import { observer } from 'mobx-react';
import { ContributionMainListTemplate } from 'themes/modules/contribution/pages';
import { setCurrentView } from 'core/utils';
import { ContributionMainListViewStore } from 'modules/contribution/stores';

@setCurrentView(rootStore => new ContributionMainListViewStore(rootStore), 'contributionMainListViewStore')
@observer
class ContributionMainList extends React.Component {
    render() {
        return <ContributionMainListTemplate {...this.props} />;
    }
}

export default ContributionMainList;