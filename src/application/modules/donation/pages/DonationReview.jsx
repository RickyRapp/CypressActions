import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonationReviewTemplate } from 'themes/application/donation/pages';
import { DonationReviewViewStore } from 'application/donation/stores';

@setCurrentView((rootStore) => new DonationReviewViewStore(rootStore), 'donationReviewViewStore')
@observer
class DonationReview extends React.Component {
    render() {
        return <DonationReviewTemplate {...this.props} />
    }
}

export default DonationReview;
