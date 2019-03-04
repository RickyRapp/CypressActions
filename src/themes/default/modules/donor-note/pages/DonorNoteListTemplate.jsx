import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ListLayout } from 'core/layouts';

function DonorNoteListTemplate({ donorNoteListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore
    } = donorNoteListViewStore;

    return (
        <ListLayout loading={loaderStore.loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility} />
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
            />
        </ListLayout>
    );
}

export default defaultTemplate(DonorNoteListTemplate);
