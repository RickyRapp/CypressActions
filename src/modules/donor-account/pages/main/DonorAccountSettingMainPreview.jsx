import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountSettingMainPreviewTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingMainPreviewViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountSettingMainPreviewViewStore(rootStore), 'donorAccountSettingMainPreviewViewStore')
@observer
class DonorAccountSettingMainPreview extends React.Component {
    render() {
        return <DonorAccountSettingMainPreviewTemplate {...this.props} />
    }
}

export default DonorAccountSettingMainPreview;