import React, {Component} from 'react';

import {LineChartTemplate} from 'themes/components';

class LineChart extends Component {
    render() {
        return (
            <div>
                <LineChartTemplate {...this.props} />
            </div>
        );
    }
}

LineChart.propTypes = {

};

export default LineChart;
