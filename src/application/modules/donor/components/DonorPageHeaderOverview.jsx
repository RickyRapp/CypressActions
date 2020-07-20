import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorPageHeaderOverviewTemplate } from 'themes/application/donor/components';
import { DonorPageHeaderOverviewViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorPageHeaderOverviewViewStore(rootStore, { donorId: props.donorId, type: props.type }), 'donorPageHeaderOverviewViewStore')
@observer
class DonorPageHeaderOverview extends React.Component {
    render() {
        return <DonorPageHeaderOverviewTemplate {...this.props} />
    }
}

export default DonorPageHeaderOverview;
