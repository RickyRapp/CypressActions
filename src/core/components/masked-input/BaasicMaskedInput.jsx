import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { BaasicMaskedInputTemplate } from "themes/components";

@observer
class BaasicMaskedInput extends Component {
    render() {
        return (
            <BaasicMaskedInputTemplate {...this.props} />
        );
    }
}

BaasicMaskedInput.propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default BaasicMaskedInput;
