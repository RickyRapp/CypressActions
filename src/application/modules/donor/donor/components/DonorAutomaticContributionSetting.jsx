import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAutomaticContributionSettingTemplate } from 'themes/application/donor/donor/components';
import { DonorAutomaticContributionSettingViewStore } from 'application/donor/donor/stores';

@setCurrentView((rootStore) => new DonorAutomaticContributionSettingViewStore(rootStore), 'donorAutomaticContributionSettingViewStore')
@observer
class DonorAutomaticContributionSetting extends React.Component {
    render() {
        return <DonorAutomaticContributionSettingTemplate {...this.props} />
    }
}

export default DonorAutomaticContributionSetting;