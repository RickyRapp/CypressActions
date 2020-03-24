import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionTabTemplate } from 'themes/application/session/pages';
import { SessionTabViewStore } from 'application/session/stores';

@setCurrentView((rootStore) => new SessionTabViewStore(rootStore), 'sessionTabViewStore')
@observer
class SessionTab extends React.Component {
    render() {
        return <SessionTabTemplate {...this.props} />
    }
}

export default SessionTab;
