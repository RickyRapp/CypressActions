import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorToDonorCreateTemplate } from 'themes/application/donor/donor-donor/pages';
import { DonorToDonorCreateViewStore } from 'application/donor/donor-donor/stores';

@setCurrentView((rootStore) => new DonorToDonorCreateViewStore(rootStore, { grantStore: rootStore.application.donor.grantStore, donorId: rootStore.userStore.applicationUser.id }), 'donorToDonorCreateViewStore')
@observer
class DonorToDonorCreate extends React.Component {
    render() {
        return <DonorToDonorCreateTemplate {...this.props} />
    }
}

export default DonorToDonorCreate;
