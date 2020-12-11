import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionListTemplate } from 'themes/application/administration/session/pages';
import { SessionViewStore } from 'application/administration/session/stores';

@setCurrentView((rootStore) => new SessionViewStore(rootStore), 'sessionViewStore')
@observer
class SessionList extends React.Component {
    render() {
        return <SessionListTemplate {...this.props} />
    }
}

export default SessionList;
