import React from 'react';
import { defaultTemplate } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, TableFilter, NumericRangeFilter, DateRangeFilter } from 'core/components';
import { ListLayout } from 'core/layouts';

function FundTransferListTemplate({ fundTransferListViewStore }) {
    const {
        senderDonorAccountSearchDropdownStore,
        recipientDonorAccountSearchDropdownStore,
        loaderStore,
        queryUtility,
        permissions,
        tableStore,
        routes: { create }
    } = fundTransferListViewStore;

    return (
        <ListLayout onCreate={permissions.create ? create : null} loading={loaderStore.loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="f-row">
                        {permissions.employeeRead &&
                            <div className="f-col f-col-lrg-3 input--multiselect">
                                {senderDonorAccountSearchDropdownStore &&
                                    <DropdownAsyncFilter
                                        queryUtility={queryUtility}
                                        name="senderDonorAccountId"
                                        store={senderDonorAccountSearchDropdownStore}
                                    />}
                            </div>}

                        {permissions.employeeRead &&
                            <div className="f-col f-col-lrg-3 input--multiselect">
                                {recipientDonorAccountSearchDropdownStore &&
                                    <DropdownAsyncFilter
                                        queryUtility={queryUtility}
                                        name="recipientDonorAccountId"
                                        store={recipientDonorAccountSearchDropdownStore}
                                    />}
                            </div>}
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
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
            />
        </ListLayout>
    );
}

export default defaultTemplate(FundTransferListTemplate);
