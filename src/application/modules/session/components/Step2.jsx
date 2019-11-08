import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { Step2ViewStore } from 'application/session/stores';
import { Step2Template } from 'themes/application/session/components';

@setCurrentView((rootStore, props) => new Step2ViewStore(
    rootStore,
    {
        nextStep: props.nextStep,
        previousStep: props.previousStep,
        setSessionKeyIdentifier: props.setSessionKeyIdentifier,
        handleResponse: props.handleResponse,
        sessionKeyIdentifier: props.sessionKeyIdentifier
    }), 'step2ViewStore')
@observer
class Step2 extends React.Component {
    render() {
        return <Step2Template {...this.props} />;
    }
}

export default Step2;
