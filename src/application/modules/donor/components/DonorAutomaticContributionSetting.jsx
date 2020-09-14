import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAutomaticContributionSettingTemplate } from 'themes/application/donor/components';
import { DonorAutomaticContributionSettingViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorAutomaticContributionSettingViewStore(rootStore, props.donorId), 'donorAutomaticContributionSettingViewStore')
@observer
class DonorAutomaticContributionSetting extends React.Component {
    render() {
        return <DonorAutomaticContributionSettingTemplate {...this.props} />
    }
}

export default DonorAutomaticContributionSetting;