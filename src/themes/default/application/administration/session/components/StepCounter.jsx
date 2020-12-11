import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import _ from 'lodash';

const StepCounter = function({ currentStep, steps }) {
	return (
		<div className="scanner">
			<img className="scanner__logo" src="/static/media/logo-app.8f17c777.svg" alt="" />
			<div className="scanner__stepper">
				{_.map(steps, step => {
					return <Step key={step} step={step} selected={step === currentStep} />;
				})}
			</div>
		</div>
	);
};

StepCounter.propTypes = {
	currentStep: PropTypes.number.isRequired,
	steps: PropTypes.array.isRequired,
};

const Step = ({ step, selected }) => (
	<React.Fragment>
		{selected ? (
			<React.Fragment>
				<div className="scanner__stepper__step scanner__stepper__step--active">{step}</div>
				<div className="scanner__stepper__step--line"></div>
			</React.Fragment>
		) : (
			<React.Fragment>
				<div className="scanner__stepper__step">{step}</div>
				<div className="scanner__stepper__step--line"></div>
			</React.Fragment>
		)}
	</React.Fragment>
);

Step.propTypes = {
	selected: PropTypes.bool.isRequired,
	step: PropTypes.number.isRequired,
};

export default defaultTemplate(StepCounter);
