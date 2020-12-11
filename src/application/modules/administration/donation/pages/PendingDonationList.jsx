import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PendingDonationListTemplate } from 'themes/application/administration/donation/pages';
import { PendingDonationViewStore } from 'application/administration/donation/stores';

@setCurrentView((rootStore) => new PendingDonationViewStore(rootStore), 'pendingDonationViewStore')
@observer
class PendingDonationList extends React.Component {
    render() {
        return <PendingDonationListTemplate {...this.props} />
    }
}

export default PendingDonationList;
