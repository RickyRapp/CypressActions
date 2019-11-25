import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GroupedDonationListTemplate } from 'themes/application/donation/pages';
import { GroupedDonationViewStore } from 'application/donation/stores';

@setCurrentView((rootStore) => new GroupedDonationViewStore(rootStore), 'groupedDonationViewStore')
@observer
class GroupedDonationList extends React.Component {
    render() {
        return <GroupedDonationListTemplate {...this.props} />
    }
}

export default GroupedDonationList;
