import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ScheduledGrantEditTemplate } from 'themes/application/scheduled-grant/pages';
import { ScheduledGrantEditViewStore } from 'application/scheduled-grant/stores';

@setCurrentView((rootStore) => new ScheduledGrantEditViewStore(rootStore), 'scheduledGrantEditViewStore')
@observer
class ScheduledGrantEdit extends React.Component {
    render() {
        return <ScheduledGrantEditTemplate {...this.props} />
    }
}

export default ScheduledGrantEdit;
