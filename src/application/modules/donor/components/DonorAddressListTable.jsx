import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAddressListTableTemplate } from 'themes/application/donor/components';
import { DonorAddressViewStore } from 'application/donor/stores';

@setCurrentView((rootStore) => new DonorAddressViewStore(rootStore), 'donorAddressViewStore')
@observer
class DonorAddressListTable extends React.Component {
    render() {
        return <DonorAddressListTableTemplate {...this.props} />
    }
}

export default DonorAddressListTable;
