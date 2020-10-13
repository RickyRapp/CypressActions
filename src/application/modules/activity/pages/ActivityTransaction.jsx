import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ActivityTransactionTemplate } from 'themes/application/activity/pages';
import { ActivityTransactionViewStore } from 'application/activity/stores';

@setCurrentView((rootStore) => new ActivityTransactionViewStore(rootStore), 'activityTransactionViewStore')
@observer
class ActivityTransaction extends React.Component {
    render() {
        return <ActivityTransactionTemplate {...this.props} />
    }
}

export default ActivityTransaction;
