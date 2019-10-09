import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { defaultTemplate } from 'core/hoc';

function BaseChartTemplate({ options }) {
    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

BaseChartTemplate.propTypes = {
    options: PropTypes.object
};

export default defaultTemplate(BaseChartTemplate);
