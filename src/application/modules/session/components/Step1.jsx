import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { Step1Template } from 'themes/application/session/components';

class Step1 extends React.Component {
    render() {
        return <Step1Template {...this.props} />;
    }
}

export default Step1;
