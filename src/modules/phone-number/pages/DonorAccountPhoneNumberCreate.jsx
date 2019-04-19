import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountPhoneNumberCreateTemplate } from 'themes/modules/phone-number/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountPhoneNumberCreateViewStore } from 'modules/phone-number/stores';

@setCurrentView((rootStore, props) => new DonorAccountPhoneNumberCreateViewStore(rootStore, { onAfterCreate: props.onAfterCreate, userId: props.userId }), 'donorAccountPhoneNumberCreateViewStore')
@observer
class DonorAccountPhoneNumberCreate extends React.Component {
    render() {
        return <DonorAccountPhoneNumberCreateTemplate {...this.props} />
    }
}

export default DonorAccountPhoneNumberCreate;