import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, DropdownAsyncFilter, BaasicModal } from 'core/components';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { ActivityAndHistoryFilterBaseTemplate } from 'themes/modules/common/activity-and-history/components';
import { GrantDetails } from 'modules/common/grant/pages';
import { ContributionDetails } from 'modules/common/contribution/pages';
import _ from 'lodash';

function ActivityAndHistoryListTemplate({ activityAndHistoryListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        donorAccountSearchDropdownStore,
        paymentTransactionStatusDropdownStore,
        detailsModalParams,
        paymentTransaction
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
                                <ActivityAndHistoryFilterBaseTemplate queryUtility={queryUtility} paymentTransactionStatusDropdownStore={paymentTransactionStatusDropdownStore} />
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
                                <GrantDetails id={paymentTransaction.grantId} />}
                            {paymentTransaction.contributionId &&
                                <ContributionDetails id={paymentTransaction.contributionId} />}
                        </div>
                    </BaasicModal>}
            </ListLayout>
        </React.Fragment>
    );
}

export default defaultTemplate(ActivityAndHistoryListTemplate);
