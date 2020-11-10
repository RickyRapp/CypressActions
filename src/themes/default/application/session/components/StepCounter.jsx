import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import _ from 'lodash';

const StepCounter = function ({ currentStep, steps }) {
    return (
        <div className="card--primary card--med type--center">
            <span className="type--base type--wgt--medium">
                {_.map(steps, step => {
                    return <Step
                    key={step}
                    step={step}
                    selected={step === currentStep}
                    />
                })}
            </span>
        </div>)
}

StepCounter.propTypes = {
    currentStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired
};

const Step = ({ step, selected }) => <span className="type--wgt--regular u-mar--left--med">{selected ? <span className="type--wgt--bold type--color--note u-separator--primary">{step}</span> : step}</span>

Step.propTypes = {
    selected: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired
};

export default defaultTemplate(StepCounter);
