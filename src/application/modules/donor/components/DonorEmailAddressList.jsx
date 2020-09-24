import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorEmailAddressListTemplate } from 'themes/application/donor/components';
import { DonorEmailAddressViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorEmailAddressViewStore(rootStore, props.donorId), 'donorEmailAddressViewStore')
@observer
class DonorEmailAddressList extends React.Component {
    render() {
        return <DonorEmailAddressListTemplate {...this.props} />
    }
}

export default DonorEmailAddressList;
