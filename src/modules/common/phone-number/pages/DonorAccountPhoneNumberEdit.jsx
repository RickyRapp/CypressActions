import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountPhoneNumberEditTemplate } from 'themes/modules/common/phone-number/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountPhoneNumberEditViewStore } from 'modules/common/phone-number/stores';

@setCurrentView((rootStore, props) => new DonorAccountPhoneNumberEditViewStore(rootStore, { userId: props.userId }), 'donorAccountPhoneNumberEditViewStore')
@observer
class DonorAccountPhoneNumberEdit extends React.Component {
    render() {
        return <DonorAccountPhoneNumberEditTemplate {...this.props} />
    }
}

export default DonorAccountPhoneNumberEdit;