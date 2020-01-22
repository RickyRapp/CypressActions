import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountThirdPartyWebsiteSettingTemplate } from 'themes/application/donor-account/components';
import { DonorAccountThirdPartyWebsiteSettingViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountThirdPartyWebsiteSettingViewStore(rootStore), 'donorAccountThirdPartyWebsiteSettingViewStore')
@observer
class DonorAccountThirdPartyWebsiteSetting extends React.Component {
    render() {
        return <DonorAccountThirdPartyWebsiteSettingTemplate {...this.props} />
    }
}

export default DonorAccountThirdPartyWebsiteSetting;