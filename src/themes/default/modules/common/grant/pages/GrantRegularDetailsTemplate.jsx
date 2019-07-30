import React from 'react';
import { defaultTemplate } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';
import { Loader } from 'core/components';
import { PaymentTransactionTableTemplate } from 'themes/modules/common/payment-transaction/components';

function GrantRegularDetailsTemplate({ grantDetailsViewStore }) {
    const {
        grantDonorAccount,
        paymentTransactionStatuses,
        paymentTransactionTypes,
        highlightId,
        loaderStore: { loading },
    } = grantDetailsViewStore;

    return (
        <React.Fragment>
            {loading &&
                <Loader />}

            {grantDonorAccount &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Donor</strong>
                            {grantDonorAccount.donorAccount.donorName}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Charity</strong>
                            {grantDonorAccount.grant.charity.name}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Amount</strong>
                            {grantDonorAccount.amount}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Confirmation Number</strong>
                            {grantDonorAccount.confirmationNumber}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Description</strong>
                            {grantDonorAccount.description}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Created</strong>
                            {moment(grantDonorAccount.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>

                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Date Updated</strong>
                            {moment(grantDonorAccount.dateUpdated).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>

                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <strong>Payment Transactions</strong>
                        </div>
                    </div>

                    <PaymentTransactionTableTemplate
                        paymentTransactionStatuses={paymentTransactionStatuses}
                        paymentTransactionTypes={paymentTransactionTypes}
                        models={grantDonorAccount.grantDonorAccountTransactions}
                        highlightId={highlightId}
                    />
                </React.Fragment>}
        </React.Fragment>
    );
};

export default defaultTemplate(GrantRegularDetailsTemplate);
