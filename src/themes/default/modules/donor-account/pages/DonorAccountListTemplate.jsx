import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ListLayout } from 'core/layouts';

function DonorAccountListTemplate({ listViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        routes: { create }
    } = listViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility} />
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
                actionsComponent={renderActions}
            />
        </ListLayout>
    );
}

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit))
        return null;

    return (
        <td className="table__body--data right">
            {isSome(onEdit) ? (
                <i className="material-icons align--v--middle" onClick={() => onEdit(item)} >
                    edit
                </i>
            ) : null}
        </td>
    );
}

export default defaultTemplate(DonorAccountListTemplate);