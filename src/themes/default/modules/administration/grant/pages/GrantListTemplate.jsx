import React from 'react';
import { defaultTemplate } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, TableFilter, NumericRangeFilter, DateRangeFilter } from 'core/components';
import { ListLayout } from 'core/layouts';

function GrantListTemplate({ grantListViewStore }) {
    const {
        loaderStore,
        queryUtility,
        tableStore,
        routes: { create }
    } = grantListViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
            />
        </ListLayout>
    );
}

export default defaultTemplate(GrantListTemplate);
