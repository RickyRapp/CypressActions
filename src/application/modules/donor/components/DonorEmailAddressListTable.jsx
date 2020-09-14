import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorEmailAddressListTableTemplate } from 'themes/application/donor/components';
import { DonorEmailAddressViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorEmailAddressViewStore(rootStore, props.donorId), 'donorEmailAddressViewStore')
@observer
class DonorEmailAddressListTable extends React.Component {
    render() {
        return <DonorEmailAddressListTableTemplate {...this.props} />
    }
}

export default DonorEmailAddressListTable;
