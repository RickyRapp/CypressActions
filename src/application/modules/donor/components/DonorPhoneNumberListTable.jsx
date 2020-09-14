import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorPhoneNumberListTableTemplate } from 'themes/application/donor/components';
import { DonorPhoneNumberViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorPhoneNumberViewStore(rootStore, props.donorId), 'donorPhoneNumberViewStore')
@observer
class DonorPhoneNumberListTable extends React.Component {
    render() {
        return <DonorPhoneNumberListTableTemplate {...this.props} />
    }
}

export default DonorPhoneNumberListTable;
