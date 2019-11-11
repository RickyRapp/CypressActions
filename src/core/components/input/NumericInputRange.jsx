import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { NumericInputRangeTemplate } from "themes/components";

@observer
class NumericInputRange extends Component {
    render() {
        return (
            <NumericInputRangeTemplate {...this.props} />
        );
    }
}

NumericInputRange.propTypes = {
    showLabel: PropTypes.bool,
    labelMin: PropTypes.string,
    labelMax: PropTypes.string,
    type: PropTypes.string,
    valueMin: PropTypes.any,
    valueMax: PropTypes.any,
    onChangeMin: PropTypes.func.isRequired,
    onChangeMax: PropTypes.func.isRequired,
    name: PropTypes.string,
    placeholderMin: PropTypes.string,
    placeholderMax: PropTypes.string,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default NumericInputRange;
