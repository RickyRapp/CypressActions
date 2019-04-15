import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, NumericRangeFilter, DateRangeFilter, DropdownFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import _ from 'lodash';

function ActivityAndHistoryMainListTemplate({ activityAndHistoryMainListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        paymentTransactionStatusDropdownStore,
        loaded,
    } = activityAndHistoryMainListViewStore;

    return (
        <React.Fragment>
            <ListLayout loading={loaderStore.loading}>
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <React.Fragment>
                            <div className="f-row">
                                <div className="f-col f-col-lrg-3 input--multiselect">
                                    {paymentTransactionStatusDropdownStore &&
                                        <DropdownFilter
                                            queryUtility={queryUtility}
                                            name="paymentTransactionStatusId"
                                            store={paymentTransactionStatusDropdownStore}
                                        />}
                                </div>
                                {/*
                                    add support for three-state checkbox 
                                */}
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
                {loaded &&
                    <BaasicTable
                        tableStore={tableStore}
                        loading={loaderStore.loading}
                    />}
            </ListLayout>
        </React.Fragment>
    );
}

export default defaultTemplate(ActivityAndHistoryMainListTemplate);
