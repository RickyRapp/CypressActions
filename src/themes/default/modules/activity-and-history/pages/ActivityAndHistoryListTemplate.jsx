import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, DropdownAsyncFilter, NumericRangeFilter, DateRangeFilter } from 'core/components';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/donor-account/components'
import _ from 'lodash';

function ActivityAndHistoryListTemplate({ activityAndHistoryListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        donorAccountSearchDropdownStore,
        permissions,
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
                            {permissions.employeeRead &&
                                <div className="f-row spc--bottom--med">
                                    <div className="f-col f-col-lrg-3 input--multiselect">
                                        {donorAccountSearchDropdownStore &&
                                            <DropdownAsyncFilter
                                                queryUtility={queryUtility}
                                                name="donorAccountId"
                                                store={donorAccountSearchDropdownStore}
                                            />}
                                    </div>
                                </div>}
                            <div className="f-row">
                                <div className="f-col f-col-lrg-4 pos--rel spc--right--sml">
                                    <NumericRangeFilter
                                        queryUtility={queryUtility}
                                        nameMin="amountRangeMin"
                                        nameMax="amountRangeMax"
                                        minPlaceholder="Min"
                                        maxPlaceholder="Max"
                                    />
                                </div>
                                <div className="f-col f-col-lrg-3">
                                    <DateRangeFilter
                                        queryUtility={queryUtility}
                                        nameMin="dateCreatedStartDate"
                                        nameMax="dateCreatedEndDate"
                                    />
                                </div>
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
