import React from 'react';
import { observer } from "mobx-react";
import { ContributionReviewTemplate } from 'themes/modules/administration/contribution/components';
import { ContributionReviewViewStore } from 'modules/administration/contribution/stores'
import { setCurrentView } from 'core/utils';
import _ from 'lodash';

@setCurrentView((rootStore, props) => new ContributionReviewViewStore(rootStore, { id: props.id, onAfterReview: props.onAfterReview }), 'contributionReviewViewStore')
@observer
class ContributionReview extends React.Component {
    render() {
        return <ContributionReviewTemplate {...this.props} />
    }
}

export default ContributionReview;
