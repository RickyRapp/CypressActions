import React from 'react';
import moment from 'moment';
import _ from 'lodash';

function DetailsTemplate({ contribution, paymentTypes }) {
    const achId = _.find(paymentTypes, { abrv: 'ach' }).id;
    const wireTransferId = _.find(paymentTypes, { abrv: 'wire-transfer' }).id;
    const chaseQuickPayId = _.find(paymentTypes, { abrv: 'chase-quickpay' }).id;
    const checkId = _.find(paymentTypes, { abrv: 'check' }).id;
    const stockAndMutualFundsId = _.find(paymentTypes, { abrv: 'stock-and-mutual-funds' }).id;

    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Payment Type</strong>
                    {_.find(paymentTypes, { id: contribution.paymentTypeId }).name}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Amount</strong>
                    {contribution.amount}
                </div>

                {contribution.description &&
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Description</strong>
                        {contribution.description}
                    </div>}

                <div className="form__group f-col f-col-lrg-3">
                    <strong>Date Created</strong>
                    {moment(contribution.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                </div>

                <div className="form__group f-col f-col-lrg-3">
                    <strong>Date Updated</strong>
                    {moment(contribution.dateUpdated).format('YYYY-MM-DD HH:mm:ss')}
                </div>

                {(contribution.paymentTypeId === achId || contribution.paymentTypeId === wireTransferId && contribution.bankAccountId) &&
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Bank Account </strong>
                        {contribution.bankAccount.name}
                    </div>}

                {contribution.paymentTypeId === checkId &&
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Check Number </strong>
                        {contribution.checkNumber}
                    </div>}
            </div>

            {contribution.paymentTypeId === stockAndMutualFundsId &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Financial Institution </strong>
                            {contribution.financialInstitution}
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
                                                {contribution.financialInstitutionAddressLine1}
                                            </div>
                                            <div className="form__group f-col f-col-lrg-3">
                                                <strong>Financial Institution  Address Line 1</strong>
                                                {contribution.financialInstitutionAddressLine2}
                                            </div>
                                            <div className="form__group f-col f-col-lrg-3">
                                                <strong>Financial Institution City</strong>
                                                {contribution.financialInstitutionCity}
                                            </div>
                                            <div className="form__group f-col f-col-lrg-3">
                                                <strong>Financial Institution State</strong>
                                                {contribution.financialInstitutionState}
                                            </div>
                                            <div className="form__group f-col f-col-lrg-3">
                                                <strong>Financial Institution Zip Code</strong>
                                                {contribution.financialInstitutionZipCode}
                                            </div>
                                        </React.Fragment>}
                                    {contribution.financialInstitutionPhoneNumber &&
                                        <div className="form__group f-col f-col-lrg-3">
                                            <strong>Financial Institution Phone Number</strong>
                                            {contribution.financialInstitutionPhoneNumber}
                                        </div>
                                    }
                                </React.Fragment>}
                        </div>}
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Account Number</strong>
                            {contribution.accountNumber}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Security Type</strong>
                            {contribution.securityType}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Security Symbol</strong>
                            {contribution.securitySymbol}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Number Of Shares</strong>
                            {contribution.numberOfShares}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Estimated Value</strong>
                            {contribution.estimatedValue}
                        </div>
                    </div>
                </React.Fragment>}
            {contribution.paymentTypeId === chaseQuickPayId &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Transaction Id</strong>
                        {contribution.transactionId}
                    </div>
                    {contribution.memo &&
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Memo</strong>
                            {contribution.memo}
                        </div>}
                </div>}
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-3">
                    <h5>Payer Information</h5>
                    <div className="display--b pull">Show payer informations</div>
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>First Name</strong>
                    {contribution.payerInformation.firstName}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Last Name</strong>
                    {contribution.payerInformation.lastName}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Address Line 1</strong>
                    {contribution.payerInformation.address.addressLine1}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Address Line 2</strong>
                    {contribution.payerInformation.address.addressLine2}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>City</strong>
                    {contribution.payerInformation.address.city}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>State</strong>
                    {contribution.payerInformation.address.state}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Zip Code</strong>
                    {contribution.payerInformation.address.zipCode}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Email</strong>
                    {contribution.payerInformation.emailAddress.email}
                </div>
                <div className="form__group f-col f-col-lrg-3">
                    <strong>Number</strong>
                    {contribution.payerInformation.phoneNumber.number}
                </div>
            </div>
        </React.Fragment>
    );
}

export default DetailsTemplate;