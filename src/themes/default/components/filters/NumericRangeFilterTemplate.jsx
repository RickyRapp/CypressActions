import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, isSome } from 'core/utils';

class NumericRangeFilterTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
        this.handleMinBlur = this.handleMinBlur.bind(this);
        this.handleMaxBlur = this.handleMaxBlur.bind(this);
    }

    handleMinChange(event) {
        if (event.target.value) {
            this.props.queryUtility.filter[this.props.nameMin] = Number(event.target.value);
        }
        else {
            this.props.queryUtility.filter[this.props.nameMin] = null;
        }
    }
    handleMaxChange(event) {
        if (event.target.value) {
            this.props.queryUtility.filter[this.props.nameMax] = Number(event.target.value);
        }
        else {
            this.props.queryUtility.filter[this.props.nameMax] = null;
        }
    }

    handleMinBlur() {
        if (this.props.queryUtility.filter[this.props.nameMin] && this.props.queryUtility.filter[this.props.nameMax]) {
            if (this.props.queryUtility.filter[this.props.nameMin] > this.props.queryUtility.filter[this.props.nameMax]) {
                this.handleMinChange({ target: { value: null } })
            }
        }
    }
    handleMaxBlur() {
        if (this.props.queryUtility.filter[this.props.nameMin] && this.props.queryUtility.filter[this.props.nameMax]) {
            if (this.props.queryUtility.filter[this.props.nameMin] > this.props.queryUtility.filter[this.props.nameMax]) {
                this.handleMaxChange({ target: { value: null } })
            }
        }
    }

    render() {
        return (
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <input
                        className={this.props.className}
                        type={this.props.type}
                        name={this.props.nameMin}
                        placeholder={this.props.minPlaceholder}
                        value={this.props.queryUtility.filter[this.props.nameMin] || ''}
                        min={this.props.minMinValue}
                        max={this.props.minMaxValue}
                        onChange={this.handleMinChange}
                        onBlur={this.handleMinBlur}
                        onKeyPress={e => { if (e.key === 'Enter') { this.props.queryUtility.fetch(); } }}
                    />
                    {this.props.isClearable && isSome(this.props.queryUtility.filter[this.props.nameMin]) &&
                        <button
                            className="btn btn--input-icon  input__icon"
                            onClick={() => (this.props.queryUtility.filter[this.props.nameMin] = null)}
                            tabIndex="-1"
                        >
                            <i className="icomoon icon-remove" />
                        </button>
                    }
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <input
                        className={this.props.className}
                        type={this.props.type}
                        name={this.props.nameMax}
                        placeholder={this.props.maxPlaceholder}
                        value={this.props.queryUtility.filter[this.props.nameMax] || ''}
                        min={this.props.maxinValue}
                        max={this.props.maxMaxValue}
                        onChange={this.handleMaxChange}
                        onBlur={this.handleMaxBlur}
                        onKeyPress={e => { if (e.key === 'Enter') { this.props.queryUtility.fetch(); } }}
                    />
                    {this.props.isClearable && isSome(this.props.queryUtility.filter[this.props.nameMax]) &&
                        <button
                            className="btn btn--input-icon  input__icon"
                            onClick={() => (this.props.queryUtility.filter[this.props.nameMax] = null)}
                            tabIndex="-1"
                        >
                            <i className="icomoon icon-remove" />
                        </button>
                    }
                </div>
            </div>
        );
    }
}

NumericRangeFilterTemplate.propTypes = {
    queryUtility: PropTypes.object,
    nameMin: PropTypes.string,
    nameMax: PropTypes.string,
    className: PropTypes.string,
    minPlaceholder: PropTypes.string,
    maxPlaceholder: PropTypes.string,
    type: PropTypes.string,
    isClearable: PropTypes.bool,
    minMinValue: PropTypes.number,
    minMaxValue: PropTypes.number,
    maxMinValue: PropTypes.number,
    maxMaxValue: PropTypes.number
};

NumericRangeFilterTemplate.defaultProps = {
    nameMin: 'min',
    nameMax: 'max',
    className: 'input input--med input--search w--250--px',
    minPlaceholder: 'Min',
    maxPlaceholder: 'Max',
    type: 'number',
    isClearable: true,
    minMinValue: 0,
    minMaxValue: 999999999,
    maxMinValue: 0,
    maxMaxValue: 999999999
};

export default defaultTemplate(NumericRangeFilterTemplate);
