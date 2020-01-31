import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountAutomaticContributionSettingTemplate } from 'themes/application/donor-account/components';
import { DonorAccountAutomaticContributionSettingViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountAutomaticContributionSettingViewStore(rootStore), 'donorAccountAutomaticContributionSettingViewStore')
@observer
class DonorAccountAutomaticContributionSetting extends React.Component {
    render() {
        return <DonorAccountAutomaticContributionSettingTemplate {...this.props} />
    }
}

export default DonorAccountAutomaticContributionSetting;