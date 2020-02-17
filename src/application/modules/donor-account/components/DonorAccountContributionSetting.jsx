import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountContributionSettingTemplate } from 'themes/application/donor-account/components';
import { DonorAccountContributionSettingViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountContributionSettingViewStore(rootStore), 'donorAccountContributionSettingViewStore')
@observer
class DonorAccountContributionSetting extends React.Component {
    render() {
        return <DonorAccountContributionSettingTemplate {...this.props} />
    }
}

export default DonorAccountContributionSetting;
