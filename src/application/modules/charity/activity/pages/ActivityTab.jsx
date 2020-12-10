import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ActivityTabTemplate } from 'themes/application/charity/activity/pages';
import { ActivityTabViewStore } from 'application/charity/activity/stores';

@setCurrentView((rootStore) => new ActivityTabViewStore(rootStore), 'activityTabViewStore')
@observer
class ActivityTab extends React.Component {
    render() {
        return <ActivityTabTemplate {...this.props} />
    }
}

export default ActivityTab;
