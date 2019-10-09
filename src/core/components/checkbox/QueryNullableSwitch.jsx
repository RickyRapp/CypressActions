import React, {Component} from 'react';
import {QueryNullableSwitchTemplate} from "themes/components";

class QueryNullableSwitch extends Component {
    render() {
        return (
            <QueryNullableSwitchTemplate {...this.props} />
        );
    }
}

export default QueryNullableSwitch;
