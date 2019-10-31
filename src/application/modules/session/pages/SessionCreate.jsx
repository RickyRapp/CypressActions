import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionCreateTemplate } from 'themes/application/session/pages';
import { SessionCreateViewStore } from 'application/session/stores';

@setCurrentView((rootStore) => new SessionCreateViewStore(rootStore), 'sessionCreateViewStore')
@observer
class SessionCreate extends React.Component {
    render() {
        return <SessionCreateTemplate {...this.props} />
    }
}

export default SessionCreate;
