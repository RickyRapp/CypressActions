import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

import { BaasicButton } from 'core/components';

const BaasicFormControlsTemplate = function (props) {
    const { form, onSubmit, controls, label, t, disableSave, type } = props;

    return (
        <React.Fragment>
            {(!controls || controls.onSubmit) && (
                <BaasicButton
                    type={type}
                    className="btn btn--base btn--primary u-mar--right--sml"
                    onClick={onSubmit || form.onSubmit}
                    disabled={disableSave}
                    rotate
                    icon={
                        form.submitting || form.validating
                            ? "synchronize-arrows-1 rotate"
                            : ''
                    }
                    label={t(label)}
                />
            )}

            {/* TODO: add more form controls here if required */}
        </React.Fragment>
    );
};

BaasicFormControlsTemplate.propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    disableSave: PropTypes.bool,
    controls: PropTypes.object,
    validation: PropTypes.object,
    authorization: PropTypes.any,
    label: PropTypes.string,
    t: PropTypes.any,
    type: PropTypes.string
};

BaasicFormControlsTemplate.defaultProps = {
    validation: {},
    label: 'FORM_CONTROLS.SAVE_BUTTON',
    disableSave: false,
    type: 'submit'
};

export default defaultTemplate(BaasicFormControlsTemplate);
