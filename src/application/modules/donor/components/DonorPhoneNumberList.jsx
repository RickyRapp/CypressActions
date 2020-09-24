import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorPhoneNumberListTemplate } from 'themes/application/donor/components';
import { DonorPhoneNumberViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorPhoneNumberViewStore(rootStore, props.donorId), 'donorPhoneNumberViewStore')
@observer
class DonorPhoneNumberList extends React.Component {
    render() {
        return <DonorPhoneNumberListTemplate {...this.props} />
    }
}

export default DonorPhoneNumberList;
