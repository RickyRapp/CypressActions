import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ScheduledSettingListTemplate } from 'themes/application/administration/test/pages';
import { ScheduledSettingViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore) => new ScheduledSettingViewStore(rootStore), 'scheduledSettingViewStore')
@observer
class ScheduledSettingList extends React.Component {
    render() {
        return <ScheduledSettingListTemplate {...this.props} />
    }
}

export default ScheduledSettingList;
