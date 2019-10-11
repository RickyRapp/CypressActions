import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

import { BaasicButton } from 'core/components';

const BaasicFormControlsTemplate = function (props) {
    const { form, onSubmit, controls, t } = props;

    return (
        <React.Fragment>
            {(!controls || controls.onSubmit) && (
                <BaasicButton
                    type='submit'
                    className="btn btn--base btn--primary u-mar--right--sml"
                    onClick={onSubmit || form.onSubmit}
                    disabled={false}
                    rotate
                    icon={
                        form.submitting || form.validating
                            ? "synchronize-arrows-1 rotate"
                            : ''
                    }
                    label={t('FORM_CONTROLS.SAVE_BUTTON')}
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
    t: PropTypes.any
};

BaasicFormControlsTemplate.defaultProps = {
    validation: {}
};

export default defaultTemplate(BaasicFormControlsTemplate);
