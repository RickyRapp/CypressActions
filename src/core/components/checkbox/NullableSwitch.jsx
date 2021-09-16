import React, {Component} from 'react';
import {NullableSwitchTemplate} from "themes/components";

class NullableSwitch extends Component {
    render() {
        return (
            <NullableSwitchTemplate {...this.props} />
        );
    }
}

export default NullableSwitch;
