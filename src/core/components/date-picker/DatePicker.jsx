import React from 'react';
import { inject, observer } from 'mobx-react';
import { DatePickerTemplate } from 'themes/components';

@inject(i => ({
    timeZone: i.rootStore.timeZoneStore.timeZone
}))
@observer
class DatePicker extends React.Component {
    render() {
        return <DatePickerTemplate {...this.props} />
    }
}

export default DatePicker;
