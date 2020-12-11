import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ScheduledGrantListTemplate } from 'themes/application/administration/grant/pages';
import { ScheduledGrantViewStore } from 'application/administration/grant/stores';

@setCurrentView((rootStore) => new ScheduledGrantViewStore(rootStore), 'scheduledGrantViewStore')
@observer
class ScheduledGrantList extends React.Component {
    render() {
        return <ScheduledGrantListTemplate {...this.props} />
    }
}

export default ScheduledGrantList;
