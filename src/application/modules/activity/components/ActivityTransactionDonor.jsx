import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ActivityTransactionDonorTemplate } from 'themes/application/activity/components';
import { ActivityTransactionDonorViewStore } from 'application/activity/stores';

@setCurrentView((rootStore, props) => new ActivityTransactionDonorViewStore(rootStore, props.donorId), 'activityTransactionDonorViewStore')
@observer
class ActivityTransactionDonor extends React.Component {
    render() {
        return <ActivityTransactionDonorTemplate {...this.props} />
    }
}

export default ActivityTransactionDonor;
