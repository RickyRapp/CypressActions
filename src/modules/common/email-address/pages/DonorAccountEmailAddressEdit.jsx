import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountEmailAddressEditTemplate } from 'themes/modules/common/email-address/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountEmailAddressEditViewStore } from 'modules/common/email-address/stores';

@setCurrentView((rootStore, props) => new DonorAccountEmailAddressEditViewStore(rootStore, { userId: props.userId }), 'donorAccountEmailAddressEditViewStore')
@observer
class DonorAccountEmailAddressEdit extends React.Component {
    render() {
        return <DonorAccountEmailAddressEditTemplate {...this.props} />
    }
}

export default DonorAccountEmailAddressEdit;