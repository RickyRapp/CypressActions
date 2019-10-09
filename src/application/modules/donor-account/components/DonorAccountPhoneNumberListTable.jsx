import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountPhoneNumberListTableTemplate } from 'themes/application/donor-account/components';
import { DonorAccountPhoneNumberViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountPhoneNumberViewStore(rootStore), 'donorAccountPhoneNumberViewStore')
@observer
class DonorAccountPhoneNumberListTable extends React.Component {
    render() {
        return <DonorAccountPhoneNumberListTableTemplate {...this.props} />
    }
}

export default DonorAccountPhoneNumberListTable;
