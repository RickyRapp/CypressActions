import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingTemplate } from 'themes/application/administration/donor/components';
import { DonorAccountSettingViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorAccountSettingViewStore(rootStore), 'donorAccountSettingViewStore')
@observer
class DonorAccountSetting extends React.Component {
    render() {
        return <DonorAccountSettingTemplate {...this.props} />
    }
}

export default DonorAccountSetting;