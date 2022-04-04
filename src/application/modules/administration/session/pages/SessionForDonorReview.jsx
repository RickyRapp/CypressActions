import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionForDonorReviewTemplate } from 'themes/application/administration/session/pages';
import { SessionForDonorReviewViewStore } from 'application/administration/session/stores';

@setCurrentView((rootStore) => new SessionForDonorReviewViewStore(rootStore), 'sessionForDonorReviewViewStore')
@observer
class SessionForDonorReview extends React.Component {
    render() {
        return <SessionForDonorReviewTemplate {...this.props} />
    }
}

export default SessionForDonorReview;
