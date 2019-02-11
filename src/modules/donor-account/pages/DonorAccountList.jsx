import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountListTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountListViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountListViewStore(rootStore), 'listViewStore')
@observer
class DonorAccountList extends React.Component {
    render() {
        return <DonorAccountListTemplate {...this.props} />;
    }
}

export default DonorAccountList;