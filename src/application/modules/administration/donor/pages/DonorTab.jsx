import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorTabTemplate } from 'themes/application/administration/donor/pages';
import { DonorTabViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorTabViewStore(rootStore), 'donorTabViewStore')
@observer
class DonorTab extends React.Component {
    render() {
        return <DonorTabTemplate {...this.props} />
    }
}

export default DonorTab;
