import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, NumericRangeFilter, DateRangeFilter, ThreeStateToggleFilter } from 'core/components';
import { CharityHeaderDetails } from 'modules/main/charity/components';
import { PageContentHeader } from 'core/layouts';
import { ListLayout } from 'core/layouts';

function DonationListTemplate({ donationListViewStore }) {
    const {
        loaderStore,
        queryUtility,
        tableStore,
        id
    } = donationListViewStore;

    return (
        <ListLayout loading={loaderStore.loading}>
            <PageContentHeader><CharityHeaderDetails userId={id} type='charity' /></PageContentHeader>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
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
                        <div className="f-col f-col-lrg-3">
                            <ThreeStateToggleFilter
                                queryUtility={queryUtility}
                                name="done"
                                title="Done Transaction"
                            />
                        </div>
                    </div>
                </TableFilter>
            </div>
            {tableStore &&
                <BaasicTable
                    tableStore={tableStore}
                    loading={loaderStore.loading}
                />}
        </ListLayout>
    );
}

export default defaultTemplate(DonationListTemplate);
