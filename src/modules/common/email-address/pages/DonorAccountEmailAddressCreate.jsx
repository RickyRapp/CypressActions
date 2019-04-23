import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountEmailAddressCreateTemplate } from 'themes/modules/common/email-address/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountEmailAddressCreateViewStore } from 'modules/common/email-address/stores';

@setCurrentView((rootStore, props) => new DonorAccountEmailAddressCreateViewStore(rootStore, { onAfterCreate: props.onAfterCreate, userId: props.userId }), 'donorAccountEmailAddressCreateViewStore')
@observer
class DonorAccountEmailAddressCreate extends React.Component {
    render() {
        return <DonorAccountEmailAddressCreateTemplate {...this.props} />
    }
}

export default DonorAccountEmailAddressCreate;