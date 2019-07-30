import React from 'react';
import { observer } from 'mobx-react';
import { GrantDonorAccountListTemplate } from 'themes/modules/main/grant-donor-account/pages';
import { setCurrentView } from 'core/utils';
import { GrantDonorAccountListViewStore } from 'modules/main/grant-donor-account/stores';

@setCurrentView(rootStore => new GrantDonorAccountListViewStore(rootStore), 'grantDonorAccountListViewStore')
@observer
class GrantDonorAccountList extends React.Component {
    render() {
        return <GrantDonorAccountListTemplate {...this.props} />;
    }
}

export default GrantDonorAccountList;