import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';

const BaasicFormControlsTemplate = function (props) {
    const { form, onSubmit, controls, label, className, disableSave = false, authorization } = props;

    return (
        <React.Fragment>
            {(!controls || controls.onSubmit) && (
                <BaasicButton
                    authorization={authorization}
                    type='submit'
                    className={className}
                    onClick={onSubmit || form.onSubmit}
                    disabled={disableSave}
                    rotate
                    icon={form.submitting || form.validating ? 'synchronize-arrows-1 rotate' : ''}
                    label={label}
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
    label: PropTypes.string,
    className: PropTypes.string,
    validation: PropTypes.object,
    authorization: PropTypes.any,
    t: PropTypes.any,
};

BaasicFormControlsTemplate.defaultProps = {
    validation: {},
    label: 'FORM_CONTROLS.SAVE_BUTTON',
    className: 'btn btn--med btn--med--wide btn--secondary'
};

export default defaultTemplate(BaasicFormControlsTemplate);
