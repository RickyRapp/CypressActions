import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorToDonorTemplate } from 'themes/application/administration/donor-donor/pages';
import { DonorToDonorViewStore } from 'application/administration/donor-donor/stores';

@setCurrentView((rootStore) => new DonorToDonorViewStore(rootStore, { donorToDonorStore: rootStore.application.administration.donorToDonorStore, donorId: rootStore.userStore.applicationUser.id }), 'donorToDonorViewStore')
@observer
class DonorToDonorTransaction extends React.Component {
    render() {
        return <DonorToDonorTemplate {...this.props} />
    }
}

export default DonorToDonorTransaction;
