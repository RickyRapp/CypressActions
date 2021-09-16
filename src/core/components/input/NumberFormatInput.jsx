import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NumberFormatInputTemplate } from "themes/components";

@observer
class NumberFormatInput extends Component {
    render() {
        return (
            <NumberFormatInputTemplate {...this.props} />
        );
    }
}

export default NumberFormatInput;
