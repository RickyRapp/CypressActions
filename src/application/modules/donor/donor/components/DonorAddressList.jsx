import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAddressListTemplate } from 'themes/application/donor/donor/components';
import { DonorAddressViewStore } from 'application/donor/donor/stores';

@setCurrentView((rootStore) => new DonorAddressViewStore(rootStore), 'donorAddressViewStore')
@observer
class DonorAddressList extends React.Component {
    render() {
        return <DonorAddressListTemplate {...this.props} />
    }
}

export default DonorAddressList;