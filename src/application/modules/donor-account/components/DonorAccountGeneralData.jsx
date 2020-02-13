import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountGeneralDataTemplate } from 'themes/application/donor-account/components';
import { DonorAccountGeneralDataEditViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountGeneralDataEditViewStore(rootStore), 'donorAccountGeneralDataEditViewStore')
@observer
class DonorAccountGeneralData extends React.Component {
    render() {
        return <DonorAccountGeneralDataTemplate {...this.props} />
    }
}

export default DonorAccountGeneralData;