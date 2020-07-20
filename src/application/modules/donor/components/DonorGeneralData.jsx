import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorGeneralDataTemplate } from 'themes/application/donor/components';
import { DonorGeneralDataEditViewStore } from 'application/donor/stores';

@setCurrentView((rootStore) => new DonorGeneralDataEditViewStore(rootStore), 'donorGeneralDataEditViewStore')
@observer
class DonorGeneralData extends React.Component {
    render() {
        return <DonorGeneralDataTemplate {...this.props} />
    }
}

export default DonorGeneralData;