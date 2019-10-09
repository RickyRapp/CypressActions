import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountAddressListTableTemplate } from 'themes/application/donor-account/components';
import { DonorAccountAddressViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountAddressViewStore(rootStore), 'donorAccountAddressViewStore')
@observer
class DonorAccountAddressListTable extends React.Component {
    render() {
        return <DonorAccountAddressListTableTemplate {...this.props} />
    }
}

export default DonorAccountAddressListTable;
