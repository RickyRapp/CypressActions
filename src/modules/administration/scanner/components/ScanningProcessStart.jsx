import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SessionNotificationHub } from 'core/components'
import { ScanningProcessStartViewStore } from 'modules/administration/scanner/stores';
import { ScanningProcessStartTemplate } from 'themes/modules/administration/scanner/components';

@setCurrentView((rootStore, props) => new ScanningProcessStartViewStore(rootStore,
    props.nextStep,
    props.previousStep,
    props.sessionKeyIdentifier,
    props.certificates), 'scanningProcessStartViewStore')
@observer
class ScanningProcessStart extends React.Component {
    render() {
        return (
            <div>
                <SessionNotificationHub
                    setConnectionId={this.props.setConnectionId}
                    rootStore={this.props.rootStore}
                    addNewCertificate={this.props.addNewCertificate}
                />
                <ScanningProcessStartTemplate {...this.props} />
            </div>
        );
    }
}

export default ScanningProcessStart;
