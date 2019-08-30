import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, BaasicModal } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ActivityAndHistoryFilterBaseTemplate } from 'themes/modules/common/activity-and-history/components';
import { GrantRegularDetails } from 'modules/common/grant/pages';
import { ContributionDetails } from 'modules/common/contribution/pages';
import { BookletOrderDetails } from 'modules/common/booklet-order/pages';
import _ from 'lodash';

function ActivityAndHistoryListTemplate({ activityAndHistoryListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        detailsModalParams,
        paymentTransaction
    } = activityAndHistoryListViewStore;

    return (
        <React.Fragment>
            <ListLayout loading={loaderStore.loading}>
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <div className="f-row">
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
                                <GrantRegularDetails id={paymentTransaction.grantId} highlightId={paymentTransaction.id} />}
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
