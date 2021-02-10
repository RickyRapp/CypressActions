import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';
import _ from 'lodash';

function BaasicToggleTemplate({ label, value, onChange, disabled, t, showLabel }) {
    return (
        <div>
            {showLabel ? t(label) : null}
            <div className={`toggle ${value ? "toggle--active" : "toggle--deactive"}`}>
                <BaasicButton
                    className={`toggle__btn ${value ? "" : "toggle__btn--active"}`}
                    onClick={onChange}
                    disabled={disabled}
                    label={null} />

                <BaasicButton
                    className={`toggle__btn ${value ? "toggle__btn--active" : ""}`}
                    onClick={onChange}
                    disabled={disabled}
                    label={null} />
            </div>
        </div>
    );
}

BaasicToggleTemplate.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    showLabel: PropTypes.bool,
    label: PropTypes.string,
};

export default defaultTemplate(BaasicToggleTemplate);
