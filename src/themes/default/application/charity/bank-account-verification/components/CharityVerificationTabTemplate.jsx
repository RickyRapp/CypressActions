import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Content } from 'core/layouts';
import { CharityBankAccountList, CharityPlaid } from 'application/charity/charity/components';
import { CharityFileVerification } from 'application/charity/charity/pages';

function CharityVerificationTabTemplate({ charityVerificationTabViewStore }) {
    const {
        loaderStore
    } = charityVerificationTabViewStore;

    return (
        <Content loading={loaderStore.loading} >
            <div className="tabs__verify__body">
                <TabLayout store={charityVerificationTabViewStore}>
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
                                />

                                <p className="card--plaid__text">Verify your connection to this organization electronically by securely logging in to the organizations bank account. Alternatively, you can also <a href="#">verify mannualy</a>.</p>
                            </div>
                        </div>

                        {/* <div className="card--primary card--plaid">
                            <div className="card--plaid__container">
                                <i class="u-icon u-icon--verification u-icon--verification-match"></i>

                                <h2 className="card--plaid__title">Congrats! It was a perfect match.</h2>
                                <p className="card--plaid__subtitle">Your account has now been verified!</p>
                                <p className="card--plaid__text">Note, we have enrolled your organization for electronic payments with the selected bank account ending in <strong>2355</strong>. If you wish to update your settings, please <a href="#">click here</a>.</p>

                                <button className="btn btn--med btn--secondary" type="button">Go To Dashboard</button>
                            </div>
                        </div>

                        <div className="card--primary card--plaid">
                            <div className="card--plaid__container">
                                <i class="u-icon u-icon--verification u-icon--verification-error"></i>

                                <h2 className="card--plaid__title u-mar--bottom--med">Oops. It seems like that wasn't a match.</h2>

                                <button className="btn btn--med btn--secondary u-mar--bottom--sml" type="button">Try A Different Bank Account</button>
                                <p className="card--plaid__text u-mar--bottom--sml">- OR -</p>
                                <button className="btn btn--med btn--secondary" type="button">Verify Manually</button>
                            </div>
                        </div>

                       <div className="card--primary card--plaid">
                            <div className="card--plaid__container">
                                <i class="u-icon u-icon--verification u-icon--verification-manual"></i>

                                <h2 className="card--plaid__title u-mar--bottom--med">Manual verification</h2>
                                <p className="card--plaid__text">Verify your connection to this organization by uploading the following documents.</p>

                                <ul className="card--plaid__list">
                                    <li>US Drivers License</li>
                                    <li><strong>Charity Name</strong> charity bank statement</li>
                                </ul>

                                <button className="btn btn--med btn--secondary" type="button">Verify Manually <span>Both documents are required.</span></button>
                            </div>
                            </div>

                        <div className="card--primary card--plaid">
                            <div className="card--plaid__container">
                                <i class="u-icon u-icon--verification u-icon--verification-received"></i>

                                <h2 className="card--plaid__title u-mar--bottom--med">Thanks! Your documents have been received.</h2>
                                <p className="card--plaid__text">You'll be notified once they have been approved.</p>
                            </div>
                        </div> */}
                    </div>
                    <div label={'CHARITY_VERIFICATION.TAB.BANK_ACCOUNT'}>
                        <CharityBankAccountList />
                    </div>
                    <div label={'CHARITY_VERIFICATION.TAB.DOCUMENT'}>
                        <CharityFileVerification />
                    </div>
                </TabLayout>
            </div>
        </Content>
    );
}

CharityVerificationTabTemplate.propTypes = {
    charityVerificationTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityVerificationTabTemplate);