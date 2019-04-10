import React from 'react';
import { observer } from 'mobx-react';
import { ActivityAndHistoryListTemplate } from 'themes/modules/activity-and-history/pages';
import { setCurrentView } from 'core/utils';
import { ActivityAndHistoryListViewStore } from 'modules/activity-and-history/stores';

@setCurrentView(rootStore => new ActivityAndHistoryListViewStore(rootStore), 'activityAndHistoryListViewStore')
@observer
class ActivityAndHistoryList extends React.Component {
    render() {
        return <ActivityAndHistoryListTemplate {...this.props} />;
    }
}

export default ActivityAndHistoryList;