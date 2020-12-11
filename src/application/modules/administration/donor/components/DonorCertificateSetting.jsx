import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorCertificateSettingTemplate } from 'themes/application/administration/donor/components';
import { DonorCertificateSettingViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorCertificateSettingViewStore(rootStore), 'donorCertificateSettingViewStore')
@observer
class DonorCertificateSetting extends React.Component {
    render() {
        return <DonorCertificateSettingTemplate {...this.props} />
    }
}

export default DonorCertificateSetting;