import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorEmailAddressListTemplate } from 'themes/application/administration/donor/components';
import { DonorEmailAddressViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorEmailAddressViewStore(rootStore), 'donorEmailAddressViewStore')
@observer
class DonorEmailAddressList extends React.Component {
    render() {
        return <DonorEmailAddressListTemplate {...this.props} />
    }
}

export default DonorEmailAddressList;
