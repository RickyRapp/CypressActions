import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ActivityAndHistoryTabTemplate } from 'themes/application/activity-and-history/pages';
import { ActivityAndHistoryTabViewStore } from 'application/activity-and-history/stores';

@setCurrentView((rootStore) => new ActivityAndHistoryTabViewStore(rootStore), 'activityAndHistoryTabViewStore')
@observer
class ActivityAndHistoryTab extends React.Component {
    render() {
        return <ActivityAndHistoryTabTemplate {...this.props} />
    }
}

export default ActivityAndHistoryTab;
