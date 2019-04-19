import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountAddressEditTemplate } from 'themes/modules/address/pages';
import { DonorAccountAddressEditViewStore } from 'modules/address/stores';

@setCurrentView((rootStore, props) => new DonorAccountAddressEditViewStore(rootStore, { userId: props.userId }), 'donorAccountAddressEditViewStore')
@observer
class DonorAccountAddressEdit extends React.Component {
    render() {
        return <DonorAccountAddressEditTemplate {...this.props} />
    }
}

export default DonorAccountAddressEdit;