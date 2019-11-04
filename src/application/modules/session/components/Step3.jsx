import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { Step3ViewStore } from 'application/session/stores';
import { Step3Template } from 'themes/application/session/components';

@setCurrentView((rootStore, props) => new Step3ViewStore(
    rootStore,
    {
        nextStep: props.nextStep,
        previousStep: props.previousStep,
        sessionKeyIdentifier: props.sessionKeyIdentifier,
        setSessionKeyIdentifier: props.setSessionKeyIdentifier,
        handleResponse: props.handleResponse
    }), 'step3ViewStore')
@observer
class Step3 extends React.Component {
    render() {
        return <Step3Template {...this.props} />;
    }
}

export default Step3;
