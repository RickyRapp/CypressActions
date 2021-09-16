import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorToDonorListTemplate } from 'themes/application/administration/donor-donor/pages';
import { DonorToDonorListViewStore } from 'application/administration/donor-donor/stores';

@setCurrentView((rootStore) => new DonorToDonorListViewStore(rootStore), 'donorToDonorListViewStore')
@observer
class DonorToDonorListTransaction extends React.Component {
    render() {
        return <DonorToDonorListTemplate {...this.props} />
    }
}

export default DonorToDonorListTransaction;
