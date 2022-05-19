import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone,
    NumberFormatInputField,
    BaasicButton,
	BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const CharityVerificationTemplate = function({ CharityVerificationViewStore, t }) {
	const { 
	} = CharityVerificationViewStore;

	return (
		<div>

        </div>
	);
};

CharityVerificationTemplate.propTypes = {
	CharityVerificationViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityVerificationTemplate);
