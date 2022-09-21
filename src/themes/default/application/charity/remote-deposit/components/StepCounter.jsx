import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import logo from 'themes/assets/img/new-logo.svg';
import _ from 'lodash';

const StepCounter = function ({ currentStep, steps, hideLogo }) {
	return (
		<div className="scanner">
			{!hideLogo && <img className="scanner__logo" src={logo} alt="logo" />}
			<div className="c-stepper__list">
				{_.map(steps, step => {
					return <Step key={step} step={step} selected={step === currentStep} currentStep={currentStep}/>;
				})}
			</div>
		</div>
	);
};

StepCounter.propTypes = {
	currentStep: PropTypes.number.isRequired,
	steps: PropTypes.array.isRequired,
};

const Step = ({ step, selected, currentStep }) => (

	<div className={`c-stepper__item ${currentStep >= step || selected ? "is-active" : ""}`}>
		<div className="c-stepper__step">Step: {step}</div>
	</div>
);

Step.propTypes = {
	selected: PropTypes.bool.isRequired,
	step: PropTypes.number.isRequired,
	currentStep: PropTypes.number.isRequired,
};

export default defaultTemplate(StepCounter);
