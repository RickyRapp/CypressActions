import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import { StepCounter } from 'themes/application/session/components';
import { Step1, Step2, Step3, Step4 } from 'application/session/components';

const SessionCreateTemplate = function ({ sessionCreateViewStore }) {
    const {
        steps,
        currentStep,
        nextStep,
        previousStep,
        setSessionKeyIdentifier,
        sessionKeyIdentifier,
        handleResponse
    } = sessionCreateViewStore;

    return (
        <Page>
            <div className="card card--form card--primary card--med u-mar--bottom--sml">
                <StepCounter
                    steps={steps}
                    currentStep={currentStep}
                />
            </div>
            {currentStep === 1 &&
                <div className="card card--form card--primary card--med u-mar--bottom--sml">
                    <Step1
                        nextStep={nextStep}
                    />
                </div>}
            {currentStep === 2 &&
                <div className="card card--form card--primary card--med u-mar--bottom--sml">
                    <Step2
                        nextStep={nextStep}
                        previousStep={previousStep}
                        setSessionKeyIdentifier={setSessionKeyIdentifier}
                        handleResponse={handleResponse}
                        sessionKeyIdentifier={sessionKeyIdentifier}
                    />
                </div>}
            {currentStep === 3 &&
                <Step3
                    nextStep={nextStep}
                    previousStep={previousStep}
                    sessionKeyIdentifier={sessionKeyIdentifier}
                    setSessionKeyIdentifier={setSessionKeyIdentifier}
                    handleResponse={handleResponse}
                />}
            {currentStep === 4 &&
                <Step4
                    nextStep={nextStep}
                    sessionKeyIdentifier={sessionKeyIdentifier}
                />}
        </Page >
    )
};

SessionCreateTemplate.propTypes = {
    sessionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(SessionCreateTemplate);
