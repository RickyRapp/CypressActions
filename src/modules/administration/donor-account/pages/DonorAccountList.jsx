import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountListTemplate } from 'themes/modules/administration/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountListViewStore } from 'modules/administration/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountListViewStore(rootStore), 'donorAccountListViewStore')
@observer
class DonorAccountList extends React.Component {
    render() {
        return <DonorAccountListTemplate {...this.props} />;
    }
}

export default DonorAccountList;