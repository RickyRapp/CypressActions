import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountTabTemplate } from 'themes/application/donor-account/pages';
import { DonorAccountTabViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountTabViewStore(rootStore), 'donorAccountTabViewStore')
@observer
class DonorAccountTab extends React.Component {
    render() {
        return <DonorAccountTabTemplate {...this.props} />
    }
}

export default DonorAccountTab;
