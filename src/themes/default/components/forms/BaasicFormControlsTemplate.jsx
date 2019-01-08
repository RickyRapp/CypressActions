import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultTemplate } from 'core/utils';

import { BaasicButton } from "core/components";

const BaasicFormControlsTemplate = defaultTemplate(
    ({ form, controls = null }) => (
        <React.Fragment>
            {(!controls || controls.onSubmit) && (
                <BaasicButton
                    type="submit"
                    className="btn btn--med btn--tertiary spc--sml display--ib"
                    onClick={form.onSubmit}
                    disabled={form.submitting || form.validating}
                    rotate
                    icon={
                        form.submitting || form.validating
                            ? "synchronize-arrows-1 rotate"
                            : ""
                    }
                    label="Save"
                />
            )}

            {/* TODO: add more form controls here if required */}
        </React.Fragment>
    )
);

export default BaasicFormControlsTemplate;
