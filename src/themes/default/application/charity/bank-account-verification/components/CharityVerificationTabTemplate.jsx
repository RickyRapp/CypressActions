import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content } from 'core/layouts';
import { CharityPlaid } from 'application/charity/charity/components';
import { CharityFileVerification, ManuallySucessMessage, PlaidSuccessfulVerificaton, PlaidUnsuccessfulVerificaton } from 'application/charity/charity/pages';

function CharityVerificationTabTemplate({ charityVerificationTabViewStore }) {
    const {
        loaderStore,
        plaidVerification,
        plaidSuccessful,
        plaidUnsuccessful,
        manuallyVerify,
        manualSuccessful,
        changeToManually,
        changeToPlaidSucessful,
        changeToPlaidUnsucessful,
        changeToPlaid,
        changeToManuallySucessful
    } = charityVerificationTabViewStore;

    return (
        <Content loading={loaderStore.loading} >
            <div>
                <div>
                    { plaidVerification &&
                    <div label={'CHARITY_VERIFICATION.TAB.PLAID'}>
                        <div className="card--primary card--plaid">
                            <div className="card--plaid__container">
                                <i class="u-icon u-icon--verification u-icon--verification-welcome"></i>

                                <h2 className="card--plaid__title">Welcome aboard!</h2>
                                <p className="card--plaid__subtitle">There's one final step before getting you started.</p>
                                <p className="card--plaid__text">We need to verify your connection to this organization.</p>

                                <CharityPlaid
                                    entityType={"charity"}
                                    bankAccount={null}
                                    changeToPlaidSucessful={changeToPlaidSucessful}
                                    changeToPlaidUnsucessful={changeToPlaidUnsucessful}
                                    isCharityVerification={true}
                                />

                                <p className="card--plaid__text">Verify your connection to this organization electronically by securely logging in to the organizations bank account. Alternatively, you can also <a href="#" onClick={changeToManually}>verify manually</a>.</p>
                            </div>
                        </div>
                    </div>
                    }
                    { plaidSuccessful &&
                    <div>
                        <PlaidSuccessfulVerificaton />
                    </div>
                    }
                    { plaidUnsuccessful && 
                    <div>
                        <PlaidUnsuccessfulVerificaton
                            changeToPlaid={changeToPlaid}
                            changeToManually={changeToManually}
                        />
                    </div>
                    }
                    { manuallyVerify &&
                    <div>
                        <CharityFileVerification
                            changeToManuallySucessful={changeToManuallySucessful}
                        />
                    </div>
                    }
                    { manualSuccessful &&
                    <div>
                        <ManuallySucessMessage />
                    </div>
                    }
                </div>
            </div>
        </Content>
    );
}

CharityVerificationTabTemplate.propTypes = {
    charityVerificationTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityVerificationTabTemplate);