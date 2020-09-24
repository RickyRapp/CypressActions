import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountInformationTemplate } from 'themes/application/donor/components';
import { DonorAccountInformationViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorAccountInformationViewStore(rootStore, props.donorId), 'donorAccountInformationViewStore')
@observer
class DonorAccountInformation extends React.Component {
    render() {
        return <DonorAccountInformationTemplate {...this.props} />
    }
}

export default DonorAccountInformation;