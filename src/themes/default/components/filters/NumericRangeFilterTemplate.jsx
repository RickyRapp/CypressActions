import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { Input } from 'core/components';

class NumericRangeFilterTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            queryUtility,
            className,
            type,
            minPlaceholder,
            maxPlaceholder,
            nameMin,
            nameMax,
            isClearable,
            minMinValue,
            minMaxValue,
            maxMinValue,
            maxMaxValue
        } = this.props;

        return (
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <input
                        className={className}
                        type={type}
                        name={nameMin}
                        placeholder={minPlaceholder}
                        value={queryUtility.filter[nameMin] || ''}
                        min={minMinValue}
                        max={minMaxValue}
                        onChange={e => { queryUtility.filter[nameMin] = Number(e.target.value) }}
                        onKeyPress={e => { if (e.key === 'Enter') { queryUtility.fetch(); } }}
                    />
                    {isClearable && queryUtility.filter[nameMin] && queryUtility.filter[nameMin] &&
                        (
                            <button
                                className="btn btn--input-icon  input__icon"
                                onClick={() => (queryUtility.filter[nameMin] = null)}
                                tabIndex="-1"
                            >
                                <i className="icomoon icon-remove" />
                            </button>
                        )}
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <input
                        className={className}
                        type={type}
                        name={nameMax}
                        placeholder={maxPlaceholder}
                        value={queryUtility.filter[nameMax] || ''}
                        min={maxMinValue}
                        max={maxMaxValue}
                        onChange={e => { queryUtility.filter[nameMax] = Number(e.target.value) }}
                        onKeyPress={e => { if (e.key === 'Enter') { queryUtility.fetch(); } }}
                    />
                    {isClearable && queryUtility.filter[nameMax] && queryUtility.filter[nameMax] &&
                        (
                            <button
                                className="btn btn--input-icon  input__icon"
                                onClick={() => (queryUtility.filter[nameMax] = null)}
                                tabIndex="-1"
                            >
                                <i className="icomoon icon-remove" />
                            </button>
                        )}
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
