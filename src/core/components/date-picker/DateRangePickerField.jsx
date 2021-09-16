import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {DateRangePickerFieldTemplate} from "themes/components";

@observer
class DateRangePickerField extends Component {
    render() {
        return (
            <DateRangePickerFieldTemplate {...this.props}/>
        );
    }
}

DateRangePickerField.propTypes = {
    fromField: PropTypes.object,
    toField: PropTypes.object,
};

export default DateRangePickerField;
