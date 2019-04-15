import React from 'react';
import { observer } from 'mobx-react';
import { ActivityAndHistoryMainListTemplate } from 'themes/modules/activity-and-history/pages';
import { setCurrentView } from 'core/utils';
import { ActivityAndHistoryMainListViewStore } from 'modules/activity-and-history/stores';

@setCurrentView(rootStore => new ActivityAndHistoryMainListViewStore(rootStore), 'activityAndHistoryMainListViewStore')
@observer
class ActivityAndHistoryList extends React.Component {
    render() {
        return <ActivityAndHistoryMainListTemplate {...this.props} />;
    }
}

export default ActivityAndHistoryList;