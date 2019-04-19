import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountSettingEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingAdministrationEditViewStore } from 'modules/donor-account/stores';

@setCurrentView((rootStore, { fetchedDonorAccount }) => new DonorAccountSettingAdministrationEditViewStore(rootStore, fetchedDonorAccount), 'donorAccountSettingEditViewStore')
@observer
class DonorAccountSettingAdministrationEdit extends React.Component {
    render() {
        return <DonorAccountSettingEditTemplate {...this.props} />
    }
}

export default DonorAccountSettingAdministrationEdit;