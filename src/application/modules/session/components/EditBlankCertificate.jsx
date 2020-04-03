import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { EditBlankCertificateTemplate } from 'themes/application/session/components';
import { EditBlankCertificateViewStore } from 'application/session/stores';

@setCurrentView((rootStore, props) => new EditBlankCertificateViewStore(
    rootStore, props.modalParams.data.sessionCertificate, props.modalParams.data.onAfterAction), 'editBlankCertificateViewStore')
@observer
class EditBlankCertificate extends React.Component {
    render() {
        return <EditBlankCertificateTemplate {...this.props} />
    }
}

export default EditBlankCertificate;
