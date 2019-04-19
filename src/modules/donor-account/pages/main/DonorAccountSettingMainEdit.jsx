import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountSettingEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingMainEditViewStore } from 'modules/donor-account/stores';

@setCurrentView((rootStore, { fetchedDonorAccount }) => new DonorAccountSettingMainEditViewStore(rootStore, fetchedDonorAccount), 'donorAccountSettingEditViewStore')
@observer
class DonorAccountSettingMainEdit extends React.Component {
    render() {
        return <DonorAccountSettingEditTemplate {...this.props} />
    }
}

export default DonorAccountSettingMainEdit;