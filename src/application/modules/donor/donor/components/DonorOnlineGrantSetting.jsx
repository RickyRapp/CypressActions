import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorOnlineGrantSettingTemplate } from 'themes/application/donor/donor/components';
import { DonorOnlineGrantSettingViewStore } from 'application/donor/donor/stores';

@setCurrentView((rootStore) => new DonorOnlineGrantSettingViewStore(rootStore), 'donorOnlineGrantSettingViewStore')
@observer
class DonorOnlineGrantSetting extends React.Component {
    render() {
        return <DonorOnlineGrantSettingTemplate {...this.props} />
    }
}

export default DonorOnlineGrantSetting;