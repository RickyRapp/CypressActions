import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorPhoneNumberListTemplate } from 'themes/application/administration/donor/components';
import { DonorPhoneNumberViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorPhoneNumberViewStore(rootStore), 'donorPhoneNumberViewStore')
@observer
class DonorPhoneNumberList extends React.Component {
    render() {
        return <DonorPhoneNumberListTemplate {...this.props} />
    }
}

export default DonorPhoneNumberList;
