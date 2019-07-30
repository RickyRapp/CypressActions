import React from 'react';
import { defaultTemplate } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';
import { Loader, BaasicModal } from 'core/components';
import { PaymentTransactionTableTemplate } from 'themes/modules/common/payment-transaction/components';

function GrantDetailsTemplate({ grantDetailsViewStore }) {
    const {
        grant,
        loaderStore,
        paymentTransactionStatuses,
        paymentTransactionTypes,
        detailsModalParams
    } = grantDetailsViewStore;

    return (
        <React.Fragment>
            {grant &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Charity</strong>
                            {grant.charity.name}
                        </div>
                        <div className="form__group f-col f-col-lrg-3">
                            <strong>Amount</strong>
                            {_.sumBy(grant.grantDonorAccounts, 'amount')}
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

                    <table className="table w--100">
                        <thead className="table__head">
                            <tr>
                                <th className="table__head--data">Donor</th>
                                <th className="table__head--data">Amount</th>
                                <th className="table__head--data">Confirmation Number</th>
                                <th className="table__head--data">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {_.orderBy(grant.grantDonorAccounts, ['dateCreated'], ['desc']).map(grantDonorAccount => {
                                return (
                                    <tr key={grantDonorAccount.id}>
                                        <td className="table__body--data">{grantDonorAccount.donorAccount.donorName}</td>
                                        <td className="table__body--data">{grantDonorAccount.amount}</td>
                                        <td className="table__body--data">{grantDonorAccount.confirmationNumber}</td>
                                        <td className="table__body--data" onClick={() => detailsModalParams.open(grantDonorAccount.grantDonorAccountTransactions)}>Transactions</td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </React.Fragment>}
            <BaasicModal modalParams={detailsModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <PaymentTransactionTableTemplate
                        paymentTransactionStatuses={paymentTransactionStatuses}
                        paymentTransactionTypes={paymentTransactionTypes}
                        models={detailsModalParams.data}
                    />
                </div>
            </BaasicModal>
        </React.Fragment>
    );
};

export default defaultTemplate(GrantDetailsTemplate);
