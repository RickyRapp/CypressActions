import React from "react";
import PropTypes from "prop-types";
import { inject } from 'mobx-react';
import { QueryUtility } from "core/utils";
import { DateQueryPickerTemplate } from "themes/components";

@inject(i => ({
    timeZone: i.rootStore.timeZoneStore.timeZone
}))
class DateQueryPicker extends React.Component {
    render() {
        return <DateQueryPickerTemplate {...this.props} />;
    }
}

DateQueryPicker.propTypes = {
    queryUtility: PropTypes.instanceOf(QueryUtility),
    propertyName: PropTypes.string,
    onChange: PropTypes.func
};

export default DateQueryPicker;
