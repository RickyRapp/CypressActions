import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { BasicRadioTemplate } from "themes/components";

@observer
class BasicRadio extends Component {
    render() {
        return (
            <BasicRadioTemplate {...this.props} />
        );
    }
}

BasicRadio.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    field: PropTypes.object.isRequired,
};

export default BasicRadio;
