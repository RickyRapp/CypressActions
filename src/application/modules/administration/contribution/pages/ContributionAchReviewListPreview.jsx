import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionAchReviewListPreviewTemplate } from 'themes/application/administration/contribution/pages';
import { ContributionAchReviewListViewStore } from 'application/administration/contribution/stores';

@setCurrentView((rootStore) => new ContributionAchReviewListPreviewViewStore(rootStore), 'contributionAchReviewListPreviewViewStore')
@observer
class ContributionAchReviewListPreview extends React.Component {
    render() {
        return <ContributionAchReviewListPreviewTemplate {...this.props} />
    }
}

export default ContributionAchReviewListPreview;
