import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionEditTemplate } from 'themes/application/session/pages';
import { SessionEditViewStore } from 'application/session/stores';

@setCurrentView((rootStore) => new SessionEditViewStore(rootStore), 'sessionEditViewStore')
@observer
class SessionEdit extends React.Component {
    render() {
        return <SessionEditTemplate {...this.props} />
    }
}

export default SessionEdit;
