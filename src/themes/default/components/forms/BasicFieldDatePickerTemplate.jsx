import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { isSome, renderIf } from 'core/utils';
import { formatDate, parseDate } from 'react-day-picker/moment';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import { defaultTemplate } from 'core/utils';

class BasicFieldDatePickerTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.field = props.field;
        this.withoutYear = props.withoutYear ? props.withoutYear : false;
    }
    handleDayChange(day) {
        this.field.set(day);
    }
    render() {
        const { field } = this;
        const { t } = this.props;
        const inputProps = { className: isSome(field.error) ? "input input--med input--text input--date input--invalid" : "input--date input input--med input--text" };

        return (
            <div className="inputgroup">
                <div>
                    <label htmlFor={field.id}>{t(field.label)}</label>
                </div>
                <DayPickerInput
                    overlayComponent={CustomOverlay}
                    dayPickerProps={!this.withoutYear ? { todayButton: t('TODAY') } :
                        {
                            captionElement: <MonthWithoutYear />,
                            month: field.value ? new Date(field.value) : ""
                        }
                    }
                    keepFocus={false}
                    inputProps={inputProps}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    onDayChange={this.handleDayChange}
                    value={!this.withoutYear ? `${field.value ? formatDate(field.value) : ''}` : `${field.value ? formatDate(typeof field.value !== "string" ? field.value.setFullYear(2000) : field.value, "MMMM D") : ''}`}
                    placeholder={!this.withoutYear ? `${formatDate(new Date())}` : `${formatDate(new Date(), "MMMM D")}`}
                />
                {renderIf(isSome(field.error))(<p className="type--tny type--color--error">{t(field.error)}</p>)}
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

// Used for showing month name in caption element
function MonthWithoutYear({ date }) {
    let month = formatDate(date, "MMMM");
    return (
        <div className="DayPicker-Caption">
            <div>{month}</div>
        </div>
    );
}


export default defaultTemplate(BasicFieldDatePickerTemplate);
