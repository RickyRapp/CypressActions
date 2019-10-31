import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionInProgressListTemplate } from 'themes/application/session/pages';
import { SessionInProgressViewStore } from 'application/session/stores';

@setCurrentView((rootStore) => new SessionInProgressViewStore(rootStore), 'sessionInProgressViewStore')
@observer
class SessionInProgressList extends React.Component {
    render() {
        return <SessionInProgressListTemplate {...this.props} />
    }
}

export default SessionInProgressList;
