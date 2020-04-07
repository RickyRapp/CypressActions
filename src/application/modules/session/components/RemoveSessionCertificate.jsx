import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RemoveSessionCertificateTemplate } from 'themes/application/session/components';
import { RemoveSessionCertificateViewStore } from 'application/session/stores';

@setCurrentView((rootStore, props) => new RemoveSessionCertificateViewStore(
    rootStore, props.modalParams.data.sessionCertificate,
    props.modalParams.data.onAfterAction),
    'removeSessionCertificateViewStore')
@observer
class RemoveSessionCertificate extends React.Component {
    render() {
        return <RemoveSessionCertificateTemplate {...this.props} />
    }
}

export default RemoveSessionCertificate;
