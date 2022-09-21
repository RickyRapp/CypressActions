import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Step2Template, Step3Template, Step4Template, StepCounter } from '../components';
import { Page } from 'core/layouts';

const RemoteDepositCreateTemplate = function ({ sessionCreateViewStore }) {
    const {
        form,
        steps,
        currentStep,
        onNextStep1Click,
        onPreviousStep2Click,
        onNextStep3Click,
        charityDropdownStore,
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
        paymentMethod,
        addEmailField,
        emailInputs,
        handleEmailChange,
        removeEmailInputField
    } = sessionCreateViewStore;

    return (
        <Page>
            <div className="container--lrg u-mar--bottom--sml">
                <div className="container--sidebar">
                    <StepCounter
                        steps={steps}
                        currentStep={currentStep}
                        hideLogo={true}
                    />
                </div>
            </div>

            <div className="container--lrg">
                <form onSubmit={form.onSubmit}>

                    {currentStep === 1 &&
                        <Step2Template
                            form={form}
                            onPreviousStepClick={onPreviousStep2Click}
                            onNextStepClick={onNextStep1Click}
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
                            addEmailField={addEmailField}
                            emailInputs={emailInputs}
                            handleEmailChange={handleEmailChange}
                            removeEmailInputField={removeEmailInputField}
                        />
                    }

                    {currentStep === 2 &&
                        <Step3Template
                            onPreviousStepClick={onPreviousStep2Click}
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
                            onNextStepClick={onNextStep3Click}
                            currentCount={currentCount}
                            sessionCertificates={sessionCertificates}
                            session={session}
                            charity={charity}
                        />
                    }
                </form>
            </div>
        </Page>
    )
};

RemoteDepositCreateTemplate.propTypes = {
    sessionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(RemoteDepositCreateTemplate);
