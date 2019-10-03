import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NullableSwitchTemplate} from "themes/components";

class NullableSwitch extends Component {
    render() {
        return (
            <NullableSwitchTemplate {...this.props} />
        );
    }
}

export default NullableSwitch;
