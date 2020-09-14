import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorContributionSettingTemplate } from 'themes/application/donor/components';
import { DonorContributionSettingViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorContributionSettingViewStore(rootStore, props.donorId), 'donorContributionSettingViewStore')
@observer
class DonorContributionSetting extends React.Component {
    render() {
        return <DonorContributionSettingTemplate {...this.props} />
    }
}

export default DonorContributionSetting;
