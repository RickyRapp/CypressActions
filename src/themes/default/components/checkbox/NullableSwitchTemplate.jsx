import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { defaultTemplate } from 'core/hoc';

function getThumbClassName(value) {
    switch (value) {
        case true:
            return ' on';
        case false:
            return ' off';
        default:
            return '';
    }
}

function NullableSwitchTemplate({ value, onChange, label, t }) {
    const onId = _.uniqueId('on_');
    const noneId = _.uniqueId('none_');
    const offId = _.uniqueId('off_');

    return (
        <div>
            <div>
                {
                    label &&
                    (
                        <label className='form__group__label'>
                            {t(label)}
                        </label>
                    )
                }
            </div>
            <div className='input--treeway'>
                <div className={'input--treeway__thumb' + getThumbClassName(value)}></div>

                <input type='radio' id={onId} name={onId} checked={value === true} onChange={() => onChange(true)} />
                <label className='input--treeway__label--first' htmlFor={onId}><i className='icomoon icon-approve padd--top--xtny display--ib'></i></label>

                <input type='radio' id={noneId} name={noneId} checked={_.isNil(value)} onChange={() => onChange(null)} />
                <label htmlFor={noneId}>|</label>

                <input type='radio' id={offId} name={offId} checked={value === false} onChange={() => onChange(false)} />
                <label className='input--treeway__label--last' htmlFor={offId}><i className='icomoon icon-remove padd--top--xtny display--ib'></i></label>

            </div>
        </div>
    )
}

NullableSwitchTemplate.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    t: PropTypes.func
};

export default defaultTemplate(NullableSwitchTemplate);
