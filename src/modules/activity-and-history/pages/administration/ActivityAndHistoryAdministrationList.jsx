import React from 'react';
import { observer } from 'mobx-react';
import { ActivityAndHistoryAdministrationListTemplate } from 'themes/modules/activity-and-history/pages';
import { setCurrentView } from 'core/utils';
import { ActivityAndHistoryAdministrationListViewStore } from 'modules/activity-and-history/stores';

@setCurrentView(rootStore => new ActivityAndHistoryAdministrationListViewStore(rootStore), 'activityAndHistoryAdministrationListViewStore')
@observer
class ActivityAndHistoryAdministrationList extends React.Component {
    render() {
        return <ActivityAndHistoryAdministrationListTemplate {...this.props} />;
    }
}

export default ActivityAndHistoryAdministrationList;