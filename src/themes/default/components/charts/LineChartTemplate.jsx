import React from 'react';
import PropTypes from 'prop-types';

import { BaseChart } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function LineChartTemplate({ options }) {
    options.chart.type = 'line';

    return (
        <div>
            <BaseChart options={options} />
        </div>
    );
}

LineChartTemplate.propTypes = {
    options: PropTypes.object
};

export default defaultTemplate(LineChartTemplate);
