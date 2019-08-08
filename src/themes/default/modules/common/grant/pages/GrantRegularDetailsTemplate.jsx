import React from 'react';
import { defaultTemplate } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';
import { Loader } from 'core/components';
import { PaymentTransactionList } from 'modules/common/payment-transaction/pages';

function GrantRegularDetailsTemplate({ grantDetailsViewStore }) {
    const {
        grant,
        highlightId,
    } = grantDetailsViewStore;

    return (
        <React.Fragment>
            {grant &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Donor</strong>
                            {grant.donorAccount.donorName}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Charity</strong>
                            {grant.donation.charity.name}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Amount</strong>
                            {grant.amount}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Confirmation Number</strong>
                            {grant.confirmationNumber}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Description</strong>
                            {grant.description}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Created</strong>
                            {moment(grant.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Updated</strong>
                            {moment(grant.dateUpdated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>

                    {grant.grantDonorAccountTransactions && grant.grantDonorAccountTransactions.length > 0 &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-12">
                                    <strong>Payment Transactions</strong>
                                </div>
                            </div>

                            <PaymentTransactionList
                                items={grant.grantDonorAccountTransactions}
                                highlightId={highlightId}
                            />
                        </React.Fragment>}
                </React.Fragment>}
        </React.Fragment>
    );
};

export default defaultTemplate(GrantRegularDetailsTemplate);
