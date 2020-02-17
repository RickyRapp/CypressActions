import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { dateFormatter } from 'core/utils';
import { BaasicButton } from 'core/components';
import moment from 'moment';

@inject(i => ({
    timeZone: i.rootStore.timeZoneStore.timeZone
}))
@observer
class DatePickerTemplate extends React.Component {
    render() {
        const {
            value,
            onChange,
            format = 'kendo-input-short',
            max,
            min,
            disabled,
            timeZone,
            clearable,
            ...otherProps
        } = this.props;

        const changeFn = (event) => {
            let value = moment(event.value).tz(timeZone);
            if (value != 'Invalid date')
                onChange(value.toDate());
            else
                onChange(moment().tz(timeZone).toDate())
        }

        return (
            <React.Fragment>
                <div className="u-pos--relative">
                    <DatePicker
                        {...otherProps}
                        value={value}
                        max={max}
                        min={min}
                        disabled={disabled}
                        format={dateFormatter.map(format)}
                        onChange={changeFn}
                    />
                    {clearable &&
                        <BaasicButton
                            onClick={() => onChange(null)}
                            className="btn btn--icon datepicker__btn"
                            icon='u-icon u-icon--unapproved--secondary u-icon--sml'
                            label="DATEPICKER.CLEAR_BUTTON"
                            onlyIcon
                            value={null}
                            disabled={disabled}
                        />}
                </div>
            </React.Fragment>
        );
    }
}

DatePickerTemplate.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    show: PropTypes.bool,
    disabled: PropTypes.bool,
    timeZone: PropTypes.string
};

DatePickerTemplate.defaultProps = {
    clearable: true
}

export default DatePickerTemplate;
