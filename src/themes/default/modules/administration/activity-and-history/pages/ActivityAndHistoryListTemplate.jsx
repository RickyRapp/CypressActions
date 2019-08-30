import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, DropdownAsyncFilter, BaasicModal, InputFilter, ThreeStateToggleFilter } from 'core/components';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { ActivityAndHistoryFilterBaseTemplate } from 'themes/modules/common/activity-and-history/components';
import { GrantDetails } from 'modules/common/grant/pages';
import { ContributionDetails } from 'modules/common/contribution/pages';
import { BookletOrderDetails } from 'modules/common/booklet-order/pages';
import _ from 'lodash';

function ActivityAndHistoryListTemplate({ activityAndHistoryListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        donorAccountSearchDropdownStore,
        detailsModalParams,
        paymentTransaction,
        paymentTransactionTypes
    } = activityAndHistoryListViewStore;

    return (
        <React.Fragment>
            <ListLayout loading={loaderStore.loading}>
                {queryUtility.filter.donorAccountId &&
                    <PageContentHeader><DonorAccountHeaderDetails userId={queryUtility.filter.donorAccountId} type='activity-and-history' /></PageContentHeader>}
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <React.Fragment>
                            <div className="f-row spc--bottom--med">
                                <div className="f-col f-col-lrg-3 input--multiselect">
                                    {donorAccountSearchDropdownStore &&
                                        <DropdownAsyncFilter
                                            queryUtility={queryUtility}
                                            name="donorAccountId"
                                            store={donorAccountSearchDropdownStore}
                                        />}
                                </div>
                            </div>
                            <div className="f-row">
                                <div className="f-col f-col-lrg-2">
                                    {paymentTransactionTypes &&
                                        <ThreeStateToggleFilter
                                            queryUtility={queryUtility}
                                            name="paymentTransactionTypeIds"
                                            yesTitle="Credit"
                                            noTitle="Debit"
                                            yesValue={_.find(paymentTransactionTypes, { abrv: 'credit' }).id}
                                            noValue={_.find(paymentTransactionTypes, { abrv: 'debit' }).id}
                                        />}
                                </div>
                                <div className="f-col f-col-lrg-2">
                                    Pending Transactions
                                    <input
                                        type={'checkbox'}
                                        value={queryUtility.filter['pending'] || ''}
                                        checked={queryUtility.filter['pending']}
                                        onChange={e => { queryUtility.filter['pending'] = e.target.checked; }} />
                                </div>
                                <ActivityAndHistoryFilterBaseTemplate queryUtility={queryUtility} />
                            </div>
                        </React.Fragment>
                    </TableFilter>
                </div>
                {tableStore &&
                    <BaasicTable
                        tableStore={tableStore}
                        loading={loaderStore.loading}
                    />}
                {paymentTransaction &&
                    <BaasicModal modalParams={detailsModalParams} >
                        <div className="col col-sml-12 card card--form card--primary card--lrg">
                            {paymentTransaction.grantId &&
                                <GrantDetails id={paymentTransaction.grantId} highlightId={paymentTransaction.id} />}
                            {paymentTransaction.contributionId &&
                                <ContributionDetails id={paymentTransaction.contributionId} highlightId={paymentTransaction.id} />}
                            {paymentTransaction.bookletOrderId &&
                                <BookletOrderDetails id={paymentTransaction.bookletOrderId} highlightId={paymentTransaction.id} />}
                        </div>
                    </BaasicModal>}
            </ListLayout>
        </React.Fragment>
    );
}

export default defaultTemplate(ActivityAndHistoryListTemplate);
