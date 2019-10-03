import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DateRangeQueryPickerTemplate} from "themes/components";
import {QueryUtility} from "core/utils";
import {DateRangeQueryPickerStore} from 'core/stores';

import {observer} from 'mobx-react';

@observer
class DateRangeQueryPicker extends Component {
    render() {
        return (
            <DateRangeQueryPickerTemplate {...this.props} />
        );
    }
}

DateRangeQueryPicker.propTypes = {
    queryUtility: PropTypes.instanceOf(QueryUtility),
    store: PropTypes.instanceOf(DateRangeQueryPickerStore),
    fromPropertyName: PropTypes.string,
    toPropertyName: PropTypes.string,
};

export default DateRangeQueryPicker;
