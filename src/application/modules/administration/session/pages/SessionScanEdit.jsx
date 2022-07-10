import React from 'react';
import { SessionScanEditTemplate } from 'themes/application/administration/session/pages';
import { observer } from 'mobx-react';
import { SessionScanEditViewStore } from 'application/administration/session/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new SessionScanEditViewStore(rootStore), 'sessionScanEditViewStore')
@observer
class SessionScanEdit extends React.Component {
    render() {
        return <SessionScanEditTemplate {...this.props} />
    }
}

export default SessionScanEdit;
