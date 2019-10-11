import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { defaultTemplate } from 'core/hoc';
import { dateFormatter } from 'core/utils';
import { BaasicButton } from 'core/components';
import moment from 'moment';

const DatePickerTemplate = function ({
    value,
    onChange,
    format = 'kendo-input-short',
    max,
    ...otherProps
}) {
    return (
        <React.Fragment>
            <div className="u-pos--relative">
                <DatePicker
                    {...otherProps}
                    value={value}
                    max={max}
                    format={dateFormatter.map(format)}
                    onChange={(result) => {
                        let value = moment(result.value).format('YYYY-MM-DD');
                        if (value != 'Invalid date')
                            onChange(new Date(value));
                        else
                            onChange(new Date())
                    }}
                />
                <BaasicButton onClick={onChange} className="btn btn--icon datepicker__btn" icon='u-icon u-icon--unapproved--secondary u-icon--sml' label="DATEPICKER.CLEAR_BUTTON" onlyIcon value={null} />
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
    show: PropTypes.bool
};

export default defaultTemplate(DatePickerTemplate);
