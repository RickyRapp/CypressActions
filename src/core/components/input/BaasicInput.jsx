import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BaasicInputTemplate } from 'themes/components';

@observer
class BaasicInput extends Component {
    render() {
        return <BaasicInputTemplate {...this.props} />;
    }
}

export default BaasicInput;
