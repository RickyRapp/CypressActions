import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorDonorCreateTemplate } from 'themes/application/donor/donor-donor/pages';
import { DonorDonorCreateViewStore } from 'application/donor/donor-donor/stores';

@setCurrentView((rootStore) => new DonorDonorCreateViewStore(rootStore, { grantStore: rootStore.application.donor.grantStore, donorId: rootStore.userStore.applicationUser.id }), 'donorDonorCreateViewStore')
@observer
class DonorDonorCreate extends React.Component {
    render() {
        return <DonorDonorCreateTemplate {...this.props} />
    }
}

export default DonorDonorCreate;
