import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ActivityGrantTabTemplate } from 'themes/application/activity/pages';
import { ActivityGrantTabViewStore } from 'application/activity/stores';

@setCurrentView((rootStore) => new ActivityGrantTabViewStore(rootStore), 'activityGrantTabViewStore')
@observer
class ActivityGrantTab extends React.Component {
    render() {
        return <ActivityGrantTabTemplate {...this.props} />
    }
}

export default ActivityGrantTab;
