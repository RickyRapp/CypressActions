import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountPageHeaderOverviewTemplate } from 'themes/application/donor-account/components';
import { DonorAccountPageHeaderOverviewViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore, props) => new DonorAccountPageHeaderOverviewViewStore(rootStore, { donorAccountId: props.donorAccountId, type: props.type }), 'donorAccountPageHeaderOverviewViewStore')
@observer
class DonorAccountPageHeaderOverview extends React.Component {
    render() {
        return <DonorAccountPageHeaderOverviewTemplate {...this.props} />
    }
}

export default DonorAccountPageHeaderOverview;
