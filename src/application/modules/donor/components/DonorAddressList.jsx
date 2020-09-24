import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAddressListTemplate } from 'themes/application/donor/components';
import { DonorAddressViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorAddressViewStore(rootStore, props.donorId), 'donorAddressViewStore')
@observer
class DonorAddressList extends React.Component {
    render() {
        return <DonorAddressListTemplate {...this.props} />
    }
}

export default DonorAddressList;
