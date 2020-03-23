import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorActivityAndHistoryTemplate } from 'themes/application/activity-and-history/pages';
import { DonorActivityAndHistoryViewStore } from 'application/activity-and-history/stores';

@setCurrentView((rootStore) => new DonorActivityAndHistoryViewStore(rootStore), 'store')
@observer
class DonorActivityAndHistory extends React.Component {
    render() {
        return <DonorActivityAndHistoryTemplate {...this.props} />
    }
}

export default DonorActivityAndHistory;
