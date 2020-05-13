import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionPendingCertificateListTemplate } from 'themes/application/session/pages';
import { SessionPendingCertificateViewStore } from 'application/session/stores';

@setCurrentView((rootStore) => new SessionPendingCertificateViewStore(rootStore), 'sessionPendingCertificateViewStore')
@observer
class SessionPendingCertificateList extends React.Component {
    render() {
        return <SessionPendingCertificateListTemplate {...this.props} />
    }
}

export default SessionPendingCertificateList;
