import React from 'react';
import { SessionScanListTemplate } from 'themes/application/administration/session/pages';
import { observer } from 'mobx-react';
import { SessionScanListViewStore } from 'application/administration/session/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new SessionScanListViewStore(rootStore), 'sessionScanViewStore')
@observer
class SessionScanList extends React.Component {
    render() {
        return <SessionScanListTemplate {...this.props} />
    }
}

export default SessionScanList;
