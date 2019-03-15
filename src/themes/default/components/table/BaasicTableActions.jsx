import React from 'react';
import { isSome } from 'core/utils';
import moment from 'moment';

function BaasicTableActionsTemplate({ item, actions, actionsConfig }) {
  if (!isSome(actions)) return null;

  let { onEdit, onDelete, onDetails } = actions;
  if (!isSome(onEdit) && !isSome(onDelete) && !isSome(onDetails)) return null;

  const { onEditConfig, onDeleteConfig } = actionsConfig;

  //edit config
  let editTitle = 'edit' // default
  if (isSome(onEditConfig)) {
    if (onEditConfig.editTitle) {
      editTitle = onEditConfig.editTitle;
    }

    if (onEditConfig.permissions) {
      if (onEditConfig.permissions.update) {
        if (onEditConfig.minutes) {
          if (moment().local().isAfter(moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.minutes, 'minutes'))) {
            onEdit = null;
          }
          else {
            editTitle += ' until ' + moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.minutes, 'minutes').format('HH:mm:ss');
          }
        }
      }
      else {
        onEdit = null;
      }
    }
  }

  //delete config
  let deleteTitle = 'delete'
  if (isSome(onDeleteConfig)) {
    if (onDeleteConfig.deleteTitle) {
      deleteTitle = onDeleteConfig.deleteTitle
    }

    if (onDeleteConfig.permissions.delete) {
      //do something if needed
    }
    else {
      onDelete = null;
    }
  }

  return (
    <td className="table__body--data right">
      {isSome(onEdit) ? (
        <i
          className="material-icons align--v--middle"
          onClick={() => onEdit(item)}
        >
          {editTitle}
        </i>
      ) : null}
      {isSome(onDelete) ? (
        <i
          className="material-icons align--v--middle"
          onClick={() => onDelete(item)}
        >
          {deleteTitle}
        </i>
      ) : null}
      {isSome(onDetails) ? (
        <i
          className="material-icons align--v--middle"
          onClick={() => onDetails(item)}
        >
          details
          </i>
      ) : null}
    </td>
  );
}

export default BaasicTableActionsTemplate;
