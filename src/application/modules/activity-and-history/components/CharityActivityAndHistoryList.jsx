import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityActivityAndHistoryListTemplate } from 'themes/application/activity-and-history/components';
import { CharityActivityAndHistoryViewStore } from 'application/activity-and-history/stores';

@setCurrentView((rootStore) => new CharityActivityAndHistoryViewStore(rootStore), 'store')
@observer
class CharityActivityAndHistoryList extends React.Component {
    render() {
        return <CharityActivityAndHistoryListTemplate {...this.props} />
    }
}

export default CharityActivityAndHistoryList;
