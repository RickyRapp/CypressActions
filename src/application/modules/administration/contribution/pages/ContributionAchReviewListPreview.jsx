import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionAchReviewListPreviewTemplate } from 'themes/application/administration/contribution/pages';
import { ContributionAchReviewListPreviewViewStore } from 'application/administration/contribution/stores';

@setCurrentView((rootStore, props) => new ContributionAchReviewListPreviewViewStore(rootStore, props), 'contributionAchReviewListPreviewViewStore')
@observer
class ContributionAchReviewListPreview extends React.Component {
    render() {
        return <ContributionAchReviewListPreviewTemplate {...this.props} />
    }
}

export default ContributionAchReviewListPreview;
