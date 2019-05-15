import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable } from 'core/components';
import { isSome } from 'core/utils';
import { ListLayout } from 'core/layouts';

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
                    actionsComponent={renderActions}
                />}
        </React.Fragment>
    );
}

function renderActions({ item, actions }) {
    if (!isSome(actions))
        return null;

    let { onDelete } = actions;
    if (!isSome(onDelete))
        return null;

    return (
        <td className="table__body--data right">
            {isSome(onDelete) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onDelete(item)}
                >
                    Delete
                </i>
            ) : null}
        </td>
    );
}

export default defaultTemplate(DocumentListTemplate);