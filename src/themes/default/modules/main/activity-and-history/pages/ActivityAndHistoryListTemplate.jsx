import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, BaasicModal } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ActivityAndHistoryFilterBaseTemplate } from 'themes/modules/common/activity-and-history/components';
import { GrantDetails } from 'modules/common/grant/pages';
import { ContributionDetails } from 'modules/common/contribution/pages';
import _ from 'lodash';

function ActivityAndHistoryListTemplate({ activityAndHistoryListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        paymentTransactionStatusDropdownStore,
        detailsModalParams,
        paymentTransaction
    } = activityAndHistoryListViewStore;

    return (
        <React.Fragment>
            <ListLayout loading={loaderStore.loading}>
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <React.Fragment>
                            <div className="f-row">
                                <ActivityAndHistoryFilterBaseTemplate queryUtility={queryUtility}
                                    paymentTransactionStatusDropdownStore={paymentTransactionStatusDropdownStore} />
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
                            {console.log(paymentTransaction)}
                            {paymentTransaction.grantId &&
                                <GrantDetails id={paymentTransaction.grantId} highlightId={paymentTransaction.id} />}
                            {paymentTransaction.contributionId &&
                                <ContributionDetails id={paymentTransaction.contributionId} highlightId={paymentTransaction.id} />}
                            {paymentTransaction.bookletOrderId &&
                                <div>TODO</div>}
                        </div>
                    </BaasicModal>}
            </ListLayout>
        </React.Fragment>
    );
}

export default defaultTemplate(ActivityAndHistoryListTemplate);
