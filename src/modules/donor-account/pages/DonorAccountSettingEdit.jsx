import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountSettingEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingEditViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountSettingEditViewStore(rootStore), 'settingEditViewStore')
@observer
class DonorAccountSettingEdit extends React.Component {
    render() {
        return <DonorAccountSettingEditTemplate {...this.props} />
    }
}

export default DonorAccountSettingEdit;