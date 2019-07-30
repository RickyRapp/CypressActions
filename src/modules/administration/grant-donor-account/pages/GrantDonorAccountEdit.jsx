import React from 'react';
import { observer } from 'mobx-react';
import { GrantDonorAccountEditTemplate } from 'themes/modules/common/grant-donor-account/pages';
import { setCurrentView } from 'core/utils';
import { GrantDonorAccountEditViewStore } from 'modules/administration/grant-donor-account/stores';

@setCurrentView(rootStore => new GrantDonorAccountEditViewStore(rootStore), 'grantDonorAccountEditViewStore')
@observer
class GrantDonorAccountEdit extends React.Component {
    render() {
        return <GrantDonorAccountEditTemplate {...this.props} />;
    }
}

export default GrantDonorAccountEdit;