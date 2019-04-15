import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountSettingAdministrationEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingAdministrationEditViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountSettingAdministrationEditViewStore(rootStore), 'donorAccountSettingAdministrationEditViewStore')
@observer
class DonorAccountSettingAdministrationEdit extends React.Component {
    render() {
        return <DonorAccountSettingAdministrationEditTemplate {...this.props} />
    }
}

export default DonorAccountSettingAdministrationEdit;