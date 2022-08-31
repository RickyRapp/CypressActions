import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Step1Template, Step2Template, Step3Template, Step4Template, StepCounter } from '../components';

const RemoteDepositCreateTemplate = function ({ sessionCreateViewStore }) {
    const {
        form,
        steps,
        currentStep,
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
        charityName,
        charityAddress,
        taxId,
        phoneNumber,
        paymentMethod
    } = sessionCreateViewStore;

    return (
        <React.Fragment>
            <div className="container--sml u-mar--bottom--sml">
                <StepCounter
                    steps={steps}
                    currentStep={currentStep}
                    hideLogo={true}
                />
            </div>

            <div className="container--lrg">
                <form onSubmit={form.onSubmit}>

                    {currentStep === 1 &&
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
                            paymentMethod={paymentMethod}
                        />
                    }

                    {currentStep === 2 &&
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
                    }

                    {currentStep === 3 &&
                        <Step4Template
                            onNextStepClick={onNextStep4Click}
                            currentCount={currentCount}
                            sessionCertificates={sessionCertificates}
                            session={session}
                            charity={charity}
                        />
                    }
                </form>
            </div>
        </React.Fragment>
    )
};

RemoteDepositCreateTemplate.propTypes = {
    sessionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(RemoteDepositCreateTemplate);
