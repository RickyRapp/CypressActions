import React from 'react';
import { observer } from 'mobx-react';
import { DonationListTemplate } from 'themes/modules/main/donation/pages';
import { setCurrentView } from 'core/utils';
import { DonationListViewStore } from 'modules/main/donation/stores';

@setCurrentView(rootStore => new DonationListViewStore(rootStore), 'donationListViewStore')
@observer
class DonationList extends React.Component {
    render() {
        return <DonationListTemplate {...this.props} />;
    }
}

export default DonationList;