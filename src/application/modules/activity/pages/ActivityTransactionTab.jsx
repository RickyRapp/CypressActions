import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ActivityTransactionTabTemplate } from 'themes/application/activity/pages';
import { ActivityTransactionTabViewStore } from 'application/activity/stores';

@setCurrentView((rootStore) => new ActivityTransactionTabViewStore(rootStore), 'activityTransactionTabViewStore')
@observer
class ActivityTransactionTab extends React.Component {
    render() {
        return <ActivityTransactionTabTemplate {...this.props} />
    }
}

export default ActivityTransactionTab;
