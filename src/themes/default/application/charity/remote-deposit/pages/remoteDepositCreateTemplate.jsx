import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Step1Template, Step2Template, Step3Template, Step4Template, StepCounter } from '../components';

const RemoteDepositCreateTemplate = function ({ sessionCreateViewStore }) {
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
        charity,
        insufficientAmount,
        isCharitySelected,
        givingCardModal,
        createGivingCardGrant,
        charityName,
        charityAddress,
        taxId,
        phoneNumber
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
                        <Step1Template 
                            onNextStepClick={onNextStep1Click}
                            givingCardModal={givingCardModal}
                            createGivingCardGrant={createGivingCardGrant}
                        />
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
                            isCharitySelected={isCharitySelected}
                            charityName={charityName}
                            charityAddress={charityAddress}
                            taxId={taxId}
                            phoneNumber={phoneNumber}
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
                            insufficientAmount={insufficientAmount}
                        />
                    </div>}
                {currentStep === 4 &&
                    <div className="container container--base u-padd--bottom--med">
                        <Step4Template
                            onNextStepClick={onNextStep4Click}
                            currentCount={currentCount}
                            sessionCertificates={sessionCertificates}
                            session={session}
                            charity={charity}
                        />
                    </div>}
            </form>
        </React.Fragment>
    )
};

RemoteDepositCreateTemplate.propTypes = {
    sessionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(RemoteDepositCreateTemplate);
