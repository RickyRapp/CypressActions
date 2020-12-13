import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorTabTemplate } from 'themes/application/donor/donor/pages';
import { DonorTabViewStore } from 'application/donor/donor/stores';

@setCurrentView((rootStore) => new DonorTabViewStore(rootStore), 'donorTabViewStore')
@observer
class DonorTab extends React.Component {
    render() {
        return <DonorTabTemplate {...this.props} />
    }
}

export default DonorTab;
