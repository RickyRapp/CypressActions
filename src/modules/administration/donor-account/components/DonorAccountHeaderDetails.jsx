import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountHeaderDetailsTemplate } from 'themes/modules/administration/donor-account/components';
import { DonorAccountHeaderDetailsViewStore } from 'modules/administration/donor-account/stores';

@setCurrentView((rootStore, { userId, type }) => new DonorAccountHeaderDetailsViewStore(rootStore, userId, type), 'donorAccountHeaderDetailsViewStore')
@observer
class DonorAccountHeaderDetails extends React.Component {
    render() {
        return <DonorAccountHeaderDetailsTemplate {...this.props} />;
    }
}

export default DonorAccountHeaderDetails;