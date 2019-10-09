import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountEmailAddressListTableTemplate } from 'themes/application/donor-account/components';
import { DonorAccountEmailAddressViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountEmailAddressViewStore(rootStore), 'donorAccountEmailAddressViewStore')
@observer
class DonorAccountEmailAddressListTable extends React.Component {
    render() {
        return <DonorAccountEmailAddressListTableTemplate {...this.props} />
    }
}

export default DonorAccountEmailAddressListTable;
