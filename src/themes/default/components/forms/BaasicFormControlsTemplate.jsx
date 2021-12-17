import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';
import { isSome } from 'core/utils';

const BaasicFormControlsTemplate = function (props) {
    const { form, onSubmit, controls, label, className, disableSave, authorization, classNameExtend } = props;

    return (
        <React.Fragment>
            {(!controls || controls.onSubmit) && (
                <BaasicButton
                    authorization={authorization}
                    type='submit'
                    className={className}
                    classNameExtend={classNameExtend}
                    onClick={onSubmit || form.onSubmit}
                    disabled={isSome(disableSave) ? disableSave : form.submitting}
                    rotate
                    icon={form.submitting || form.validating ? 'u-icon u-icon--med u-icon--sync u-rotate--login' : ''}
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
    classNameExtend: PropTypes.string,
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
