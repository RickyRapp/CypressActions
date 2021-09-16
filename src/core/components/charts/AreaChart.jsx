import React, {Component} from 'react';
import {AreaChartTemplate} from 'themes/components';

class AreaChart extends Component {
    render() {
        return (
            <div>
                <AreaChartTemplate {...this.props} />
            </div>
        );
    }
}

AreaChart.propTypes = {
};

export default AreaChart;
