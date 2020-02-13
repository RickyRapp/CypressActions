import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountCertificateSettingTemplate } from 'themes/application/donor-account/components';
import { DonorAccountCertificateSettingViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountCertificateSettingViewStore(rootStore), 'donorAccountCertificateSettingViewStore')
@observer
class DonorAccountCertificateSetting extends React.Component {
    render() {
        return <DonorAccountCertificateSettingTemplate {...this.props} />
    }
}

export default DonorAccountCertificateSetting;