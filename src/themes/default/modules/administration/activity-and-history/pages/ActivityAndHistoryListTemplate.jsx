import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, DropdownAsyncFilter } from 'core/components';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { ActivityAndHistoryFilterBaseTemplate } from 'themes/modules/common/activity-and-history/components';
import _ from 'lodash';

function ActivityAndHistoryListTemplate({ activityAndHistoryListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        donorAccountSearchDropdownStore,
        paymentTransactionStatusDropdownStore,
        loaded,
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
                {loaded && queryUtility.filter.donorAccountId &&
                    <BaasicTable
                        tableStore={tableStore}
                        loading={loaderStore.loading}
                    />}
            </ListLayout>
        </React.Fragment>
    );
}

export default defaultTemplate(ActivityAndHistoryListTemplate);
