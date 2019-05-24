import React from 'react';
import { defaultTemplate } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, TableFilter, NumericRangeFilter, DateRangeFilter } from 'core/components';
import { ListLayout } from 'core/layouts';

function DonationListTemplate({ donationListViewStore }) {
    const {
        loaderStore,
        queryUtility,
        tableStore,
        routes: { create },
    } = donationListViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
            {tableStore &&
                    <BaasicTable
                        tableStore={tableStore}
                        loading={loaderStore.loading}
                    />}
        </ListLayout>
    );
}

export default defaultTemplate(DonationListTemplate);
