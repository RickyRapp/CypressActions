import React from 'react';
import { defaultTemplate } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';
import { Loader } from 'core/components';
import { PaymentTransactionTableRowTemplate } from 'themes/modules/common/payment-transaction/components';

function GrantDetailsTemplate({ grantDetailsViewStore }) {
    const {
        grant,
        loaderStore,
        paymentTransactionStatuses,
        paymentTransactionTypes,
        highlightId
    } = grantDetailsViewStore;

    return (
        <React.Fragment>
            {loaderStore.loading &&
                <Loader />}
            {grant &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Charity</strong>
                            {grant.charity.name}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Amount</strong>
                            {grant.amount}
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
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <strong>Payment Transactions</strong>
                        </div>
                    </div>

                    <PaymentTransactionTableTemplate
                        highlightId={highlightId}
                        paymentTransactionStatuses={paymentTransactionStatuses}
                        paymentTransactionTypes={paymentTransactionTypes}
                        models={grant.grantDonorAccountTransactions}
                    />
                </React.Fragment>}
        </React.Fragment>
    );
};

export default defaultTemplate(GrantDetailsTemplate);
