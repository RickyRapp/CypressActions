import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountAddressEditTemplate } from 'themes/modules/address/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountAddressEditViewStore } from 'modules/address/stores';

@setCurrentView(rootStore => new DonorAccountAddressEditViewStore(rootStore), 'donorAccountAddressEditViewStore')
@observer
class DonorAccountAddressEdit extends React.Component {
    render() {
        return <DonorAccountAddressEditTemplate {...this.props} />
    }
}

export default DonorAccountAddressEdit;