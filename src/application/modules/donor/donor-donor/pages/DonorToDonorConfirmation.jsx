import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorToDonorConfirmationPageTemplate } from 'themes/application/donor/donor-donor/pages';
import { DonorToDonorCreateViewStore } from 'application/donor/donor-donor/stores';

@setCurrentView((rootStore) => new DonorToDonorCreateViewStore(rootStore, { donorToDonorStore: rootStore.application.donor.donorToDonorStore, donorId: rootStore.userStore.applicationUser.id }), 'donorToDonorCreateViewStore')
@observer
class DonorToDonorConfirmation extends React.Component {
    render() {
        return <DonorToDonorConfirmationPageTemplate {...this.props} />
    }
}

export default DonorToDonorConfirmation;
