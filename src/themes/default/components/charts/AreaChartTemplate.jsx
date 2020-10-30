import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

import { BaseChart, MinMaxAvg } from 'core/components';

const AreaChartTemplate = function({ options }) {
    options.chart.type = 'areaspline';

    return (
        <React.Fragment>
            <React.Fragment>
                <MinMaxAvg data={options.series} />
            </React.Fragment>
            <div className='card card--med card--primary spc--bottom--med'>
                <BaseChart options={options} />
            </div>
        </React.Fragment>
    );
};

AreaChartTemplate.propTypes = {
    options: PropTypes.object.isRequired
};

export default defaultTemplate(AreaChartTemplate);
