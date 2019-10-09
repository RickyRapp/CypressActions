import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {BaseChartTemplate} from 'themes/components';

class BaseChart extends Component {
    render() {
        return (
            <BaseChartTemplate {...this.props} />
        );
    }
}

BaseChart.propTypes = {
    options: PropTypes.object.isRequired
};

export default BaseChart;
