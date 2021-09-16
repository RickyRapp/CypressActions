import React from "react";
import PropTypes from "prop-types";
import {observer} from 'mobx-react';
import { DatePickerFieldTemplate } from "themes/components";

@observer
class DatePickerField extends React.Component {
    render() {
        return <DatePickerFieldTemplate {...this.props} />;
    }
}

DatePickerField.propTypes = {
    field: PropTypes.object.isRequired
};

export default DatePickerField;
