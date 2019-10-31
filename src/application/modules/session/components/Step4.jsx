import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { Step4ViewStore } from 'application/session/stores';
import { Step4Template } from 'themes/application/session/components';

@setCurrentView((rootStore, props) => new Step4ViewStore(
    rootStore,
    {
        nextStep: props.nextStep,
        sessionKeyIdentifier: props.sessionKeyIdentifier
    }), 'step4ViewStore')
@observer
class Step4 extends React.Component {
    render() {
        return <Step4Template {...this.props} />;
    }
}

export default Step4;
