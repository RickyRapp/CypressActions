import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { isSome, renderIf, defaultTemplate } from 'core/utils';
import { formatDate, parseDate } from 'react-day-picker/moment';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

class BasicFieldDatePickerTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.field = props.field;
    }
    handleDayChange(day) {
        this.field.set("value", day);
    }
    render() {
        const { field } = this;
        const { t, isClearable, before, after } = this.props;

        const inputProps = {
            className: isSome(field.error) ? "input input--med input--text input--date input--invalid" : "input--date input input--med input--text",
            disabled: field.disabled
        };

        const modifiers = {
            disabled: [
                {
                    before: before
                },
                {
                    after: after
                }
            ]
        };

        const dayPickerPropsTemplate = {
            modifiers: modifiers
        }

        return (
            <div className="inputgroup">
                <div>
                    <label htmlFor={field.id}>{field.label}</label>
                </div>
                <DayPickerInput
                    overlayComponent={CustomOverlay}
                    dayPickerProps={
                        dayPickerPropsTemplate
                    }
                    keepFocus={false}
                    inputProps={inputProps}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    onDayChange={this.handleDayChange}
                    value={`${field.value ? formatDate(field.value) : ''}`}
                    placeholder={`${formatDate(new Date())}`}
                    disabledDays={{ daysOfWeek: [0] }}
                />
                {isClearable && field.value &&
                    <div>
                        <span onClick={() => this.handleDayChange("")}>Clear</span>
                    </div>}
                {renderIf(isSome(field.error))(<p className="type--tny type--color--error">{field.error}</p>)}
            </div>
        )
    }
}

CustomOverlay.propTypes = {
    classNames: PropTypes.object.isRequired,
    selectedDay: PropTypes.instanceOf(Date),
    children: PropTypes.node.isRequired
};

// Used for modal representation
function CustomOverlay({ classNames, selectedDay, children, ...props }) {
    return (
        <div
            className={classNames.overlayWrapper}
            style={{ 'zIndex': 9998 }}
            {...props}
        >
            <div className={classNames.overlay}>
                {children}
            </div>
        </div>
    );
}

export default defaultTemplate(BasicFieldDatePickerTemplate);
