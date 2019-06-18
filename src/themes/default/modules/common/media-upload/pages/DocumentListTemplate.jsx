import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable } from 'core/components';
import { isSome } from 'core/utils';

function DocumentListTemplate({ mediaUploadListViewStore }) {
    const {
        loaderStore,
        tableStore,
    } = mediaUploadListViewStore;

    return (
        <React.Fragment>
            {tableStore &&
                <BaasicTable
                    tableStore={tableStore}
                    loading={loaderStore.loading}
                />}
        </React.Fragment>
    );
}


export default defaultTemplate(DocumentListTemplate);