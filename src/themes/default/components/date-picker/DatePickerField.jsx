import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { isSome, renderIf } from 'core/utils';
import { defaultTemplate } from 'core/hoc';
import { DatePicker } from 'core/components';
import moment from 'moment';

@inject(i => ({
    timeZone: i.rootStore.timeZoneStore.timeZone
}))
@observer
class DatePickerFieldTemplate extends React.Component {
    render() {
        const { field, t, onChange, timeZone, ...otherProps } = this.props;
        const { value, ...otherFieldProps } = field.bind();

        const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

        const warningClasses = classNames({
            'input--warning': !field.isValid && field.touched && !field.isDirty
        });
        const maxValue = field.rules && field.rules.indexOf('before_or_equal_date') !== -1 ? field.rules.substring(field.rules.indexOf('before_or_equal_date')).split(':')[1] : null;
        const minValue = field.rules && field.rules.indexOf('min_date') !== -1 ? field.rules.substring(field.rules.indexOf('min_date')).split(':')[1] : null;

        if (maxValue) {
            let value = moment(maxValue).tz(timeZone);
            otherFieldProps.max = value.toDate();
        }
        if (minValue) {
            let value = moment(minValue).tz(timeZone);
            otherFieldProps.min = value.toDate();
        }

        const handleOnChange = (event) => {
            field.onChange(event);

            if (onChange) {
                onChange(event);
            }
        }

        return (
            <div>
                <div className='form__group__label'>{t(field.label)}{requiredMark}</div>
                <DatePicker
                    {...otherProps}
                    {...otherFieldProps}
                    format={field.initialSetup.format}
                    className={warningClasses}
                    value={value ? new Date(value) : null}
                    onChange={handleOnChange}
                />
                {renderIf(isSome(field.localizedError))(
                    <div className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>
                )}
            </div>
        );
    }
};

DatePickerFieldTemplate.propTypes = {
    field: PropTypes.object.isRequired,
    t: PropTypes.func,
    onChange: PropTypes.func
};

export default defaultTemplate(DatePickerFieldTemplate);
