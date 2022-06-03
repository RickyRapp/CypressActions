import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionAchReviewListTemplate } from 'themes/application/administration/contribution/pages';
import { ContributionAchReviewListViewStore } from 'application/administration/contribution/stores';

@setCurrentView((rootStore) => new ContributionAchReviewListViewStore(rootStore), 'contributionAchReviewListViewStore')
@observer
class ContributionAchReviewList extends React.Component {
    render() {
        return <ContributionAchReviewListTemplate {...this.props} />
    }
}

export default ContributionAchReviewList;
