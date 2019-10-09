import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {MinMaxAvgTemplate} from 'themes/components';

class MinMaxAvg extends Component {
    render() {
        return (
            <MinMaxAvgTemplate {...this.props} />
        );
    }
}

MinMaxAvg.propTypes = {
    data: PropTypes.array.isRequired
};

export default MinMaxAvg;
