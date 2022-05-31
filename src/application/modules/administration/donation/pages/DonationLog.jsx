import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonationLogViewStore } from '../stores';
import DonationLogTemplate from 'themes/application/administration/donation/pages/DonationLogTemplate';

@setCurrentView((rootStore, props) => new DonationLogViewStore(rootStore, props.modalParams.data), 'donationLogViewStore')
@observer
class DonationLog extends React.Component {
    render() { 
        return <DonationLogTemplate {...this.props} />
    }
}

export default DonationLog;