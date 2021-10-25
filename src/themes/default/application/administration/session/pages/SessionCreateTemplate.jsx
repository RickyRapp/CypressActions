import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { StepCounter, Step1Template, Step2Template, Step3Template, Step4Template } from 'themes/application/administration/session/components';

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
        cancelCertificate,
        editCheck,
        removeFromCache,
        sessionCertificates,
        currentCount,
        session,
        blankCertificateModal,
        isChangedDefaultAddress,
        onChangeDefaultAddressClick,
        modalStore,
        filterCharities,
        setCharityId,
        charity
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
                            isChangedDefaultAddress={isChangedDefaultAddress}
                            onChangeDefaultAddressClick={onChangeDefaultAddressClick}
                            filterCharities={filterCharities}
                            setCharityId={setCharityId} 
                        />
                    </div>}

                {currentStep === 3 &&
                    <div className="u-padd--left--sml u-padd--right--sml">
                        <Step3Template
                            onPreviousStepClick={onPreviousStep3Click}
                            form={form}
                            sessionCertificates={sessionCertificates}
                            barcode={barcode}
                            blankCertificateModal={blankCertificateModal}
                            onBarcodeChange={onBarcodeChange}
                            cancelCertificate={cancelCertificate}
                            editCheck={editCheck}
                            removeFromCache={removeFromCache}
                            modalStore={modalStore}
                            charity={charity}
                        />
                    </div>}
                {currentStep === 4 &&
                    <div className="container container--base u-padd--bottom--med">
                        <Step4Template
                            onNextStepClick={onNextStep4Click}
                            currentCount={currentCount}
                            sessionCertificates={sessionCertificates}
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
