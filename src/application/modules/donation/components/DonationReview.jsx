import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonationReviewTemplate } from 'themes/application/donation/components';
import { DonationReviewViewStore } from 'application/donation/stores';

@setCurrentView((rootStore, props) => new DonationReviewViewStore(rootStore, props.modalParams.data.id, props.modalParams.data.onAfterReview), 'donationReviewViewStore')
@observer
class DonationReview extends React.Component {
    render() {
        return <DonationReviewTemplate {...this.props} />
    }
}

export default DonationReview;
