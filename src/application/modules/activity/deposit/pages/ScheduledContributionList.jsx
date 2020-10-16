import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ScheduledContributionListTemplate } from 'themes/application/activity/deposit/pages';
import { ScheduledContributionViewStore } from 'application/activity/deposit/stores';

@setCurrentView((rootStore) => new ScheduledContributionViewStore(rootStore), 'scheduledContributionViewStore')
@observer
class ScheduledContributionList extends React.Component {
    render() {
        return <ScheduledContributionListTemplate {...this.props} />
    }
}

export default ScheduledContributionList;
