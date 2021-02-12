import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { EditBlankCertificateTemplate } from 'themes/application/administration/session/components';
import { EditBlankCertificateViewStore } from 'application/administration/session/stores';

@setCurrentView((rootStore, props) => new EditBlankCertificateViewStore(
    rootStore,
    props.modalParams.data.grant,
    props.modalParams.data.onAfterAction), 'editBlankCertificateViewStore')
@observer
class EditBlankCertificate extends React.Component {
    render() {
        return <EditBlankCertificateTemplate {...this.props} />
    }
}

export default EditBlankCertificate;
