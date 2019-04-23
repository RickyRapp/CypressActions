import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountSettingEditTemplate } from 'themes/modules/main/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingEditViewStore } from 'modules/main/donor-account/stores';

@setCurrentView((rootStore, { fetchedDonorAccount }) => new DonorAccountSettingEditViewStore(rootStore, fetchedDonorAccount), 'donorAccountSettingEditViewStore')
@observer
class DonorAccountSettingEdit extends React.Component {
    render() {
        return <DonorAccountSettingEditTemplate {...this.props} />
    }
}

export default DonorAccountSettingEdit;