import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorGivingCardSettingListTemplate } from 'themes/application/donor/donor/components';
import { DonorGivingCardSettingListViewStore } from 'application/donor/donor/stores';

@setCurrentView((rootStore) => new DonorGivingCardSettingListViewStore(rootStore), 'donorGivingCardSettingListViewStore')
@observer
class DonorGivingCardSettingList extends React.Component {
    render() {
        return <DonorGivingCardSettingListTemplate {...this.props} />
    }
}

export default DonorGivingCardSettingList;