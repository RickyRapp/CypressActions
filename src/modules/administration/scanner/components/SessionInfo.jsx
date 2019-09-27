import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionInfoViewStore } from 'modules/administration/scanner/stores';
import { SessionInfoTemplate } from 'themes/modules/administration/scanner/components';

@setCurrentView((rootStore, props) => new SessionInfoViewStore(
    rootStore,
    props.nextStep,
    props.previousStep,
    props.setSessionKeyIdentifier,
    props.setExistingCertificates
), 'sessionInfoViewStore')
@observer
class SessionInfo extends React.Component {
    render() {
        return <SessionInfoTemplate {...this.props} />;
    }
}

export default SessionInfo;
