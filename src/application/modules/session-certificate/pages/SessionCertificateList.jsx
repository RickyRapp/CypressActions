import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionCertificateListTemplate } from 'themes/application/session-certificate/pages';
import { SessionCertificateViewStore } from 'application/session-certificate/stores';

@setCurrentView((rootStore) => new SessionCertificateViewStore(rootStore), 'sessionCertificateViewStore')
@observer
class SessionCertificateList extends React.Component {
    render() {
        return <SessionCertificateListTemplate {...this.props} />
    }
}

export default SessionCertificateList;
