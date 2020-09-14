import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingTemplate } from 'themes/application/donor/components';
import { DonorAccountSettingViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorAccountSettingViewStore(rootStore, props.donorId), 'donorAccountSettingViewStore')
@observer
class DonorAccountSetting extends React.Component {
    render() {
        return <DonorAccountSettingTemplate {...this.props} />
    }
}

export default DonorAccountSetting;
