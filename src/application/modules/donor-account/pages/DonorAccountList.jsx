import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountListTemplate } from 'themes/application/donor-account/pages';
import { DonorAccountViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountViewStore(rootStore), 'donorAccountViewStore')
@observer
class DonorAccountList extends React.Component {
    render() {
        return <DonorAccountListTemplate {...this.props} />
    }
}

export default DonorAccountList;
