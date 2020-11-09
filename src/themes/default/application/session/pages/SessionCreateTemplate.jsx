import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import { StepCounter, Step1Template, Step2Template, Step3Template } from 'themes/application/session/components';

const SessionCreateTemplate = function ({ sessionCreateViewStore }) {
    const {
        form,
        steps,
        currentStep,
        onNextStep1Click,
        onNextStep2Click,
        onPreviousStep2Click,
        charityDropdownStore,
        onPreviousStep3Click,
        barcode,
        onBarcodeChange,
        sessionCertificates
    } = sessionCreateViewStore;

    return (
        <Page>
            <div className="card--primary card--med u-mar--bottom--sml">
                <StepCounter
                    steps={steps}
                    currentStep={currentStep}
                />
            </div>

            <form onSubmit={form.onSubmit}>
                {currentStep === 1 &&
                    <div className="card--primary card--med u-mar--bottom--sml">
                        <Step1Template onNextStepClick={onNextStep1Click} />
                    </div>}

                {currentStep === 2 &&
                    <div className="card--primary card--med u-mar--bottom--sml">
                        <Step2Template
                            form={form}
                            onNextStepClick={onNextStep2Click}
                            onPreviousStepClick={onPreviousStep2Click}
                            charityDropdownStore={charityDropdownStore}
                        />
                    </div>}

                {currentStep === 3 &&
                    <Step3Template
                        onPreviousStepClick={onPreviousStep3Click}
                        form={form}
                        sessionCertificates={sessionCertificates}
                        barcode={barcode}
                        onBarcodeChange={onBarcodeChange}
                    />}
                {/* 
            {currentStep === 4 &&
                <Step4
                    nextStep={nextStep}
                    sessionKeyIdentifier={sessionKeyIdentifier}
                />} */}
            </form>
        </Page >
    )
};

SessionCreateTemplate.propTypes = {
    sessionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(SessionCreateTemplate);
