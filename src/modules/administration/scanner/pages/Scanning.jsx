import React from 'react';
import { observer } from 'mobx-react';
import { ScanningViewStore } from 'modules/administration/scanner/stores';
import { StepCounter, ChooseLanguage, SessionInfo, ScanningProcessStart, ScanningProcessFinished } from 'modules/administration/scanner/components';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ScanningViewStore(rootStore), 'scanningViewStore')
@observer
class Scanning extends React.Component {
    render() {
        const {
            steps,
            currentStep,
            sessionKeyIdentifier,
            certificates,
            setConnectionId,
            addNewCertificate,
            nextStep,
            previousStep,
            setSessionKeyIdentifier,
            setExistingCertificates
        } = this.props.scanningViewStore;

        return (
            <section className="w--400--px align--h--center padd--top--med">
                <div>
                    <StepCounter steps={steps} currentStep={currentStep}></StepCounter>
                </div>
                <div>
                    {currentStep === 1 &&
                        <ChooseLanguage
                            nextStep={nextStep}
                        >
                        </ChooseLanguage>}

                    {currentStep === 2 &&
                        <SessionInfo
                            nextStep={nextStep}
                            previousStep={previousStep}
                            setSessionKeyIdentifier={setSessionKeyIdentifier}
                            setExistingCertificates={setExistingCertificates}
                        >
                        </SessionInfo>}

                    {currentStep === 3 &&
                        <ScanningProcessStart
                            nextStep={nextStep}
                            previousStep={previousStep}
                            sessionKeyIdentifier={sessionKeyIdentifier}
                            certificates={certificates}
                            setConnectionId={setConnectionId}
                            addNewCertificate={addNewCertificate}
                        >
                        </ScanningProcessStart>}

                    {currentStep === 4 &&
                        <ScanningProcessFinished
                            nextStep={nextStep}
                        >
                        </ScanningProcessFinished>}
                </div>
            </section>
        )
    }
}

export default Scanning;
