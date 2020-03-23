import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityActivityAndHistoryTemplate } from 'themes/application/activity-and-history/pages';
import { CharityActivityAndHistoryViewStore } from 'application/activity-and-history/stores';

@setCurrentView((rootStore) => new CharityActivityAndHistoryViewStore(rootStore), 'store')
@observer
class CharityActivityAndHistory extends React.Component {
    render() {
        return <CharityActivityAndHistoryTemplate {...this.props} />
    }
}

export default CharityActivityAndHistory;
