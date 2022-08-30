import React from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { Popup } from '@progress/kendo-react-popup';
import { defaultTemplate } from 'core/hoc';
import moment from 'moment';

const DateRangePickerTemplate = function(props) {
	const { t, format, store, ...otherProps } = props;

	function internalOnChange(event) {
		if (props.onChange) {
			props.onChange(event);
		}
	}

	// prettier-ignore
	let inputValue = `${props.value.start ? moment(props.value.start).format("MM/DD/YYYY") : ""} ${props.value.end ? `- ${moment(props.value.end).format("MM/DD/YYYY")}` : ""}`;

	store.setErrors(props.errors);

	return (
		<div className="c-date-range__input">
			{/* prettier-ignore */}
			<input
                className="input input--lrg input--text"
                placeholder={"Start date - End date"}
                value={inputValue.length > 1 ? inputValue : ""}
                readOnly={true}
            />
			<div className="c-date-range">
				<DateRangePicker
					{...otherProps}
					calendarSettings={{ views: 2 }}
					format={t(format)}
					startDateInput={store.d1}
					// endDateInput={store.d2}
					onChange={internalOnChange}
					// startDateInputSettings={store.componentProps.options.startDateInputSettings}
					// endDateInputSettings={store.componentProps.options.endDateInputSettings}
				/>
			</div>
		</div>
	);
};

DateRangePickerTemplate.propTypes = {
	value: PropTypes.shape({
		start: PropTypes.instanceOf(Date),
		end: PropTypes.instanceOf(Date),
	}).isRequired,
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	format: PropTypes.string,
	store: PropTypes.object,
	errors: PropTypes.any,
};

DateRangePickerTemplate.defaultProps = {
	format: 'CORE.DATE_FORMAT.kendo-input-short',
};

export default defaultTemplate(DateRangePickerTemplate);
