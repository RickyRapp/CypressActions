import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ScheduledContributionListTemplate } from 'themes/application/donor/activity/contribution/pages';
import { ScheduledContributionViewStore } from 'application/donor/activity/contribution/stores';

@setCurrentView((rootStore) => new ScheduledContributionViewStore(rootStore), 'scheduledContributionViewStore')
@observer
class ScheduledContributionList extends React.Component {
    render() {
        return <ScheduledContributionListTemplate {...this.props} />
    }
}

export default ScheduledContributionList;
