import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicInput } from 'core/components';
import _ from 'lodash';

function BaasicSwitchTemplate({ label, value, onChange, t, disabled }) {
    const onId = _.uniqueId('on_');
    const offId = _.uniqueId('off_');
    return (
        <div className="item u-mar--bottom--sml">
            {label &&
                <label >{t(label)}</label>}
            <div className="input--switch u-clearfix">
                <BaasicInput
                    type="radio"
                    id={onId}
                    name={onId}
                    checked={value === false}
                    onChange={(e) => {
                        e.target.checked = false;
                        onChange(e);
                    }
                    }
                    disabled={disabled}
                    label={`${label}_TRUE`}
                    wrapperClassName="input--switch__wrapper"
                />
                <BaasicInput
                    type="radio"
                    id={offId}
                    name={offId}
                    checked={value === true}
                    onChange={(e) => {
                        e.target.checked = true;
                        onChange(e);
                    }
                    }
                    disabled={disabled}
                    label={`${label}_FALSE`}
                    wrapperClassName="input--switch__wrapper"
                />
            </div>
        </div>
    );
}

BaasicSwitchTemplate.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    t: PropTypes.func,
};

export default defaultTemplate(BaasicSwitchTemplate);
