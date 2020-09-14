import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorCertificateSettingTemplate } from 'themes/application/donor/components';
import { DonorCertificateSettingViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorCertificateSettingViewStore(rootStore, props.donorId), 'donorCertificateSettingViewStore')
@observer
class DonorCertificateSetting extends React.Component {
    render() {
        return <DonorCertificateSettingTemplate {...this.props} />
    }
}

export default DonorCertificateSetting;