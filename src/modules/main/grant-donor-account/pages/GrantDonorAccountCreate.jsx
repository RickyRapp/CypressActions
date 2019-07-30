import React from 'react';
import { observer } from 'mobx-react';
import { GrantDonorAccountCreateTemplate } from 'themes/modules/common/grant-donor-account/pages';
import { setCurrentView } from 'core/utils';
import { GrantDonorAccountCreateViewStore } from 'modules/main/grant-donor-account/stores';

@setCurrentView(rootStore => new GrantDonorAccountCreateViewStore(rootStore), 'grantDonorAccountCreateViewStore')
@observer
class GrantDonorAccountCreate extends React.Component {
    render() {
        return <GrantDonorAccountCreateTemplate {...this.props} />;
    }
}

export default GrantDonorAccountCreate;