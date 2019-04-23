import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ListLayout } from 'core/layouts';

function UserListTemplate({ listViewStore }) {
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

  const { onEdit, onLock, onUnlock, onApprove, onDisapprove } = actions;
  if (
    !isSome(onEdit) &&
    !isSome(onLock) &&
    !isSome(onUnlock) &&
    !isSome(onApprove) &&
    !isSome(onDisapprove)
  )
    return null;

  return (
    <td className="table__body--data right">
      {isSome(onEdit) ? (
        <i
          className="material-icons align--v--middle"
          onClick={() => onEdit(item)}
        >
          edit
        </i>
      ) : null}
      {!isSome(onApprove) || !isSome(onDisapprove) ? null : item.isApproved ? (
        <i
          className="material-icons align--v--middle"
          onClick={() => onDisapprove(item)}
        >
          check_box
        </i>
      ) : (
        <i
          className="material-icons align--v--middle"
          onClick={() => onApprove(item)}
        >
          check_box_outline_blank
        </i>
      )}
      {!isSome(onLock) || !isSome(onUnlock) ? null : item.isLockedOut ? (
        <i
          className="material-icons align--v--middle"
          onClick={() => onUnlock(item)}
        >
          lock
        </i>
      ) : (
        <i
          className="material-icons align--v--middle"
          onClick={() => onLock(item)}
        >
          lock_open
        </i>
      )}
    </td>
  );
}

export default defaultTemplate(UserListTemplate);
