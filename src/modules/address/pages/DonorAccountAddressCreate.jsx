import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountAddressCreateTemplate } from 'themes/modules/address/pages';
import { DonorAccountAddressCreateViewStore } from 'modules/address/stores';

@setCurrentView((rootStore, props) => new DonorAccountAddressCreateViewStore(rootStore, { onAfterCreate: props.onAfterCreate }), 'donorAccountAddressCreateViewStore')
@observer
class DonorAccountAddressCreate extends React.Component {
    render() {
        return <DonorAccountAddressCreateTemplate {...this.props} />
    }
}

export default DonorAccountAddressCreate;