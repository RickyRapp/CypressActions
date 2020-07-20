import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorThirdPartyWebsiteSettingTemplate } from 'themes/application/donor/components';
import { DonorThirdPartyWebsiteSettingViewStore } from 'application/donor/stores';

@setCurrentView((rootStore) => new DonorThirdPartyWebsiteSettingViewStore(rootStore), 'donorThirdPartyWebsiteSettingViewStore')
@observer
class DonorThirdPartyWebsiteSetting extends React.Component {
    render() {
        return <DonorThirdPartyWebsiteSettingTemplate {...this.props} />
    }
}

export default DonorThirdPartyWebsiteSetting;