import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ReviewCertificateTemplate } from 'themes/application/session/pages';
import { ReviewCertificateViewStore } from 'application/session/stores';

@setCurrentView((rootStore) => new ReviewCertificateViewStore(rootStore), 'reviewCertificateViewStore')
@observer
class ReviewCertificate extends React.Component {
    render() {
        return <ReviewCertificateTemplate {...this.props} />
    }
}

export default ReviewCertificate;
