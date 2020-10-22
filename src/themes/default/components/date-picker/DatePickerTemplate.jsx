import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { dateFormatter } from 'core/utils';
import { BaasicButton } from 'core/components';
import moment from 'moment';

const DatePickerTemplate = function ({ value, onChange, format = 'kendo-input-short', max, min, disabled, clearable, ...otherProps }) {
    const handleChange = e => {
        const value = e.value;
        let date = moment(value).format('YYYY-MM-DD');
        if (e.value && date != 'Invalid date' && new Date(date) >= min) {
            onChange(new Date(date));
        }
    };

    return (
        <React.Fragment>
            <div className="u-position--rel">
                <DatePicker
                    {...otherProps}
                    defaultValue={value}
                    value={value}
                    format={dateFormatter.map(format)}
                    min={min}
                    max={max}
                    onChange={handleChange}
                    disabled={disabled}
                />
                {clearable &&
                    <BaasicButton
                        onClick={onChange}
                        className="btn k-datepicker__btn tooltip"
                        icon="u-icon u-icon--clear u-icon--sml"
                        label="DATEPICKER.CLEAR_BUTTON"
                        onlyIcon
                        value={null}
                        disabled={disabled}
                    />}
            </div>
        </React.Fragment>
    );
};

DatePickerTemplate.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    show: PropTypes.bool,
    disabled: PropTypes.bool,
    timeZone: PropTypes.string,
    clearable: PropTypes.bool
};

DatePickerTemplate.defaultProps = {
    clearable: true
}

export default DatePickerTemplate;
