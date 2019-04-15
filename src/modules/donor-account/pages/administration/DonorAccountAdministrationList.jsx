import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountAdministrationListTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountAdministrationListViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountAdministrationListViewStore(rootStore), 'donorAccountAdministrationListViewStore')
@observer
class DonorAccountAdministrationList extends React.Component {
    render() {
        return <DonorAccountAdministrationListTemplate {...this.props} />;
    }
}

export default DonorAccountAdministrationList;