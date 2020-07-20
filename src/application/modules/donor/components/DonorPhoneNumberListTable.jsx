import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorPhoneNumberListTableTemplate } from 'themes/application/donor/components';
import { DonorPhoneNumberViewStore } from 'application/donor/stores';

@setCurrentView((rootStore) => new DonorPhoneNumberViewStore(rootStore), 'donorPhoneNumberViewStore')
@observer
class DonorPhoneNumberListTable extends React.Component {
    render() {
        return <DonorPhoneNumberListTableTemplate {...this.props} />
    }
}

export default DonorPhoneNumberListTable;
