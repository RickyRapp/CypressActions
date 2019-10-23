import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonationListTemplate } from 'themes/application/donation/pages';
import { DonationViewStore } from 'application/donation/stores';

@setCurrentView((rootStore) => new DonationViewStore(rootStore), 'donationViewStore')
@observer
class DonationList extends React.Component {
    render() {
        return <DonationListTemplate {...this.props} />
    }
}

export default DonationList;
