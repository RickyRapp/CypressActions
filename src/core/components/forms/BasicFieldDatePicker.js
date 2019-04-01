import React from 'react';
import { BasicFieldDatePickerTemplate } from 'themes/components';
import { observer } from 'mobx-react';

@observer
class BasicFieldDatePicker extends React.Component {
    render() {
        return <BasicFieldDatePickerTemplate {...this.props} />
    }
}

export default BasicFieldDatePicker;
