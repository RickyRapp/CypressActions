import React from 'react';
import { defaultTemplate } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';
import { Loader } from 'core/components';
import { PaymentTransactionList } from 'modules/common/payment-transaction/pages';
import { getFormattedAddress } from 'core/utils';

function ContributionDetailsTemplate({ contributionDetailsViewStore, t }) {
    const {
        loaderStore,
        contribution
    } = contributionDetailsViewStore;

    return (
        <React.Fragment>
            {loaderStore.loading &&
                <Loader />}

            {contribution &&
                <React.Fragment>
                    <h5 className="display--ib spc--top--sml">{t('DETAILS')}</h5>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Amount</strong>
                            <div>{contribution.amount}</div>
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Payment Type</strong>
                            <div>{contribution.paymentType.name}</div>
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Status</strong>
                            <div>{contribution.contributionStatus.name}</div>
                        </div>

                        {contribution.description &&
                            <div className="form__group f-col f-col-lrg-3">
                                <strong>Description</strong>
                                <div>{contribution.description}</div>
                            </div>}

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Created</strong>
                            <div>{moment(contribution.dateCreated).format('YYYY-MM-DD HH:mm')}</div>
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Updated</strong>
                            <div>{moment(contribution.dateUpdated).format('YYYY-MM-DD HH:mm')}</div>
                        </div>

                        {(contribution.paymentType.abrv === 'ach' || contribution.paymentType.abrv === 'wire-transfer' && contribution.bankAccountId) &&
                            <div className="form__group f-col f-col-lrg-3">
                                <strong>Bank Account </strong>
                                <div>{contribution.bankAccount.name}</div>
                            </div>}

                        {contribution.paymentType.abrv === 'check' &&
                            <div className="form__group f-col f-col-lrg-3">
                                <strong>Check Number </strong>
                                <div>{contribution.checkNumber}</div>
                            </div>}
                    </div>

                    {contribution.paymentType.abrv === 'stock-and-mutual-funds' &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Financial Institution </strong>
                                    <div>{contribution.financialInstitution}</div>
                                </div>
                            </div>
                            {(contribution.financialInstitutionAddressLine1 || contribution.financialInstitutionPhoneNumber) &&
                                <div className="f-row">
                                    {showStockAndMutualFundsContactInfo &&
                                        <React.Fragment>
                                            {contribution.financialInstitutionAddressLine1 &&
                                                <React.Fragment>
                                                    <div className="form__group f-col f-col-lrg-3">
                                                        <strong>Financial Institution Address Line 1</strong>
                                                        <div>{contribution.financialInstitutionAddressLine1}</div>
                                                    </div>
                                                    <div className="form__group f-col f-col-lrg-3">
                                                        <strong>Financial Institution  Address Line 1</strong>
                                                        <div>{contribution.financialInstitutionAddressLine2}</div>
                                                    </div>
                                                    <div className="form__group f-col f-col-lrg-3">
                                                        <strong>Financial Institution City</strong>
                                                        <div>{contribution.financialInstitutionCity}</div>
                                                    </div>
                                                    <div className="form__group f-col f-col-lrg-3">
                                                        <strong>Financial Institution State</strong>
                                                        <div>{contribution.financialInstitutionState}</div>
                                                    </div>
                                                    <div className="form__group f-col f-col-lrg-3">
                                                        <strong>Financial Institution Zip Code</strong>
                                                        <div>{contribution.financialInstitutionZipCode}</div>
                                                    </div>
                                                </React.Fragment>}
                                            {contribution.financialInstitutionPhoneNumber &&
                                                <div className="form__group f-col f-col-lrg-3">
                                                    <strong>Financial Institution Phone Number</strong>
                                                    <div>{contribution.financialInstitutionPhoneNumber}</div>
                                                </div>
                                            }
                                        </React.Fragment>}
                                </div>}
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Account Number</strong>
                                    <div>{contribution.accountNumber}</div>
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Security Type</strong>
                                    <div>{contribution.securityType}</div>
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Security Symbol</strong>
                                    <div>{contribution.securitySymbol}</div>
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Number Of Shares</strong>
                                    <div>{contribution.numberOfShares}</div>
                                </div>
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Estimated Value</strong>
                                    <div>{contribution.estimatedValue}</div>
                                </div>
                            </div>
                        </React.Fragment>}

                    {contribution.paymentType.abrv === 'chase-quickpay' &&
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-3">
                                <strong>Transaction Id</strong>
                                <div>{contribution.transactionId}</div>
                            </div>
                            {contribution.memo &&
                                <div className="form__group f-col f-col-lrg-3">
                                    <strong>Memo</strong>
                                    <div>{contribution.memo}</div>
                                </div>}
                        </div>}

                    <h5 className="display--ib spc--top--sml">{t('PAYERINFORMATION')}</h5>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Name</strong>
                            <div>{contribution.payerInformation.name}</div>
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Address</strong>
                            <div>{getFormattedAddress(contribution.payerInformation.address)}</div>
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Email</strong>
                            <div>{contribution.payerInformation.emailAddress.email}</div>
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Number</strong>
                            <div>{contribution.payerInformation.phoneNumber.number}</div>
                        </div>
                    </div>

                    {contribution.contributionTransactions && contribution.contributionTransactions.length > 0 &&
                        <PaymentTransactionList
                            items={contribution.contributionTransactions} />}
                </React.Fragment>}
        </React.Fragment>
    );
};

export default defaultTemplate(ContributionDetailsTemplate);
