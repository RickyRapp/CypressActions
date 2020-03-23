import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorActivityAndHistoryListTemplate } from 'themes/application/activity-and-history/components';
import { DonorActivityAndHistoryViewStore } from 'application/activity-and-history/stores';

@setCurrentView((rootStore) => new DonorActivityAndHistoryViewStore(rootStore), 'store')
@observer
class DonorActivityAndHistoryList extends React.Component {
    render() {
        return <DonorActivityAndHistoryListTemplate {...this.props} />
    }
}

export default DonorActivityAndHistoryList;
