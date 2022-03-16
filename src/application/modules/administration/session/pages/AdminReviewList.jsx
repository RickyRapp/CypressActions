import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { AdminReviewListTemplate } from 'themes/application/administration/session/pages';
import { AdminReviewViewStore } from 'application/administration/session/stores';

@setCurrentView((rootStore) => new AdminReviewViewStore(rootStore), 'adminReviewViewStore')
@observer
class AdminReviewList extends React.Component {
    render() {
        return <AdminReviewListTemplate {...this.props} />
    }
}

export default AdminReviewList;
