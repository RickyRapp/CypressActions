import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountInformationTemplate } from 'themes/application/administration/donor/components';
import { DonorAccountInformationViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorAccountInformationViewStore(rootStore), 'donorAccountInformationViewStore')
@observer
class DonorAccountInformation extends React.Component {
    render() {
        return <DonorAccountInformationTemplate {...this.props} />
    }
}

export default DonorAccountInformation;