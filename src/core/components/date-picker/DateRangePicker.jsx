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
        <React.Fragment>
            <div className="col col-sml-12 col-lrg-3">
                <label className="type--sml type--wgt--medium">
                    {label}
                    {required ? <span>*</span> : null}
                </label>
                <DateInput
                    {...other}
                    label={undefined}
                    className={error ? 'input input--med input--warning' : 'input'}
                />
                {renderIf(isSome(error))(<p className="type--tny type--color--warning u-mar--top--nano">{error}</p>)}
            </div>
        </React.Fragment>
    );
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
