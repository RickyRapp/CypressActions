import React from 'react';
import { isSome } from 'core/utils';

function BaasicTableActionsTemplate({ item, actions }) {
  if (!isSome(actions)) return null;

  const { onEdit, onDelete } = actions;
  if (!isSome(onEdit) && !isSome(onDelete)) return null

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
      {isSome(onDelete) ? (
        <i
          className="material-icons align--v--middle"
          onClick={() => onDelete(item)}
        >
          delete
        </i>
      ) : null}
    </td>
  );
}

export default BaasicTableActionsTemplate;
