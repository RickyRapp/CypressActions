import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultTemplate } from "core/utils";
import _ from 'lodash';

import { BaasicButton } from "core/components";

const BaasicFormControlsTemplate = function (props) {
  const { form, onSubmit, disableSave, controls, t, validation } = props;

  function isDisabled() {
    // in case someone passes null through validation prop
    if (validation == null) {
      return true;
    }

    return form.submitting || form.validating || !form.isDirty || !form.isValid; // || !form.changed;
  }

  return (
    <React.Fragment>
      {(!controls || controls.onSubmit) && (
        <BaasicButton
          type="submit"
          className="btn btn--med btn--tertiary spc--right--sml display--ib"
          onClick={onSubmit || form.onSubmit}
          disabled={!_.isNil(disableSave) ? disableSave : isDisabled()}
          rotate
          icon={
            form.submitting || form.validating
              ? "synchronize-arrows-1 rotate"
              : ""
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
  t: PropTypes.any
};

BaasicFormControlsTemplate.defaultProps = {
  validation: {}
};

// const BaasicFormControlsTemplate = defaultTemplate(
//     ({ form, t, onSubmit, disableSave, controls = null }) => (
//     )
// );

export default defaultTemplate(BaasicFormControlsTemplate);
