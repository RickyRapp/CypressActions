import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountSettingPreviewTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountSettingPreviewViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountSettingPreviewViewStore(rootStore), 'settingPreviewViewStore')
@observer
class DonorAccountSettingPreview extends React.Component {
    render() {
        return <DonorAccountSettingPreviewTemplate {...this.props} />
    }
}

export default DonorAccountSettingPreview;