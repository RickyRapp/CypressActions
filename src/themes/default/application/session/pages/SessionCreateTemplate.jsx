import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { StepCounter, Step1Template, Step2Template, Step3Template, Step4Template } from 'themes/application/session/components';

const SessionCreateTemplate = function ({ sessionCreateViewStore }) {
    const {
        form,
        steps,
        currentStep,
        onNextStep1Click,
        onNextStep2Click,
        onPreviousStep2Click,
        onNextStep4Click,
        charityDropdownStore,
        onPreviousStep3Click,
        barcode,
        onBarcodeChange,
        sessionCertificates,
        currentCount,
        session
    } = sessionCreateViewStore;

    return (
        <React.Fragment>
            <div className="container u-mar--bottom--sml">
                <StepCounter
                    steps={steps}
                    currentStep={currentStep}
                />
            </div>

            <form onSubmit={form.onSubmit}>
                {currentStep === 1 &&
                    <div className="container container--sml">
                        <Step1Template onNextStepClick={onNextStep1Click} />
                    </div>}

                {currentStep === 2 &&
                    <div className="container container--sml">
                        <Step2Template
                            form={form}
                            onNextStepClick={onNextStep2Click}
                            onPreviousStepClick={onPreviousStep2Click}
                            charityDropdownStore={charityDropdownStore}
                        />
                    </div>}

                {currentStep === 3 &&
                    <div className="u-padd--left--sml u-padd--right--sml">
                        <Step3Template
                            onPreviousStepClick={onPreviousStep3Click}
                            form={form}
                            sessionCertificates={sessionCertificates}
                            barcode={barcode}
                            onBarcodeChange={onBarcodeChange}
                        />
                    </div>}
                {currentStep === 4 &&
                    <div className="container container--sml">
                        <Step4Template
                            onNextStepClick={onNextStep4Click}
                            currentCount={currentCount}
                            session={session}
                        />
                    </div>}
            </form>
        </React.Fragment>
    )
};

SessionCreateTemplate.propTypes = {
    sessionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(SessionCreateTemplate);
