import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonationOverviewTemplate } from 'themes/application/donation/pages';
import { DonationViewStore } from 'application/donation/stores';

@setCurrentView((rootStore) => new DonationViewStore(rootStore), 'donationViewStore')
@observer
class DonationOverview extends React.Component {
    render() {
        return <DonationOverviewTemplate {...this.props} />
    }
}

export default DonationOverview;
