import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionReviewTemplate } from 'themes/application/contribution/components';
import { ContributionReviewViewStore } from 'application/contribution/stores';

@setCurrentView((rootStore, props) => new ContributionReviewViewStore(rootStore, props.modalParams.data.id, props.modalParams.data.onAfterReview), 'contributionReviewViewStore')
@observer
class ContributionReview extends React.Component {
    render() {
        return <ContributionReviewTemplate {...this.props} />
    }
}

export default ContributionReview;
