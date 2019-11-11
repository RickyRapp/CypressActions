import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { DateRangePickerTemplate } from 'themes/components'
import { DateInput } from "@progress/kendo-react-dateinputs";
import { setCurrentView } from "core/utils";
import { isSome, renderIf } from "core/utils";

@setCurrentView((rootStore, componentProps) => new DateRangePickerViewStore(rootStore, componentProps), 'store')
@observer
class DateRangePicker extends React.Component {
    render() {
        return <DateRangePickerTemplate {...this.props} />
    }
}

class DateRangePickerViewStore {
    constructor(props, componentProps) { // eslint-disable-line
        const { t, required, } = componentProps;
        this.componentProps = componentProps;

        this.fromError = null;
        this.toError = null;

        this.required = required;

        this.t = t;
    }

    setErrors = (e) => {
        this.fromError = (e && e.fromError) ? e.fromError : null;
        this.toError = (e && e.toError) ? e.toError : null;
    }

    /* eslint-disable */
    d1 = cProps => <CustomDateInput label={this.t('DATE_RANGE.START')} error={this.fromError} required={this.required} {...cProps} />
    d2 = cProps => <CustomDateInput label={this.t('DATE_RANGE.END')} error={this.toError} required={this.required} {...cProps} />
    /* eslint-enable */
}

const CustomDateInput = function (props) {
    const { label, error, required, ...other } = props;

    return (
        <div className="display--ib align--v--top">
            <span className="form__group__label">{label}{required ? <span>*</span> : null}</span>
            <DateInput {...other} label={undefined} className={error ? "input--warning" : ""} />
            {renderIf(isSome(error))(
                <div className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{error}</div>
            )}
        </div>
    )
};

CustomDateInput.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool
};

DateRangePicker.propTypes = {
    value: PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date)
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default DateRangePicker;
