import React from 'react';
import { isSome, defaultTemplate } from 'core/utils';

function BaasicTableActionsTemplate({ item, actions, actionsRender, t }) {
  if (!isSome(actions))
    return null;

  let { onEdit, onReview, onDetails, onDelete, onCancel } = actions;
  if (!isSome(onReview) && !isSome(onEdit) && !isSome(onDetails) && !isSome(onDelete) && !isSome(onCancel))
    return null;

  const { renderEdit, renderReview, renderDelete, renderDetails, renderCancel } = actionsRender;

  //edit config
  let editTitle = t('EDIT') // default
  if (renderEdit && _.isFunction(renderEdit)) {
    if (!renderEdit(item)) {
      onEdit = null;
    }
  }

  //review config
  let reviewTitle = t('REVIEW') // default
  if (renderReview && _.isFunction(renderReview)) {
    if (!renderReview(item)) {
      onReview = null;
    }
  }

  //delete config
  let deleteTitle = t('DELETE') // default
  if (renderDelete && _.isFunction(renderDelete)) {
    if (!renderDelete(item)) {
      onDelete = null;
    }
  }

  //details config
  let detailsTitle = t('DETAILS') // default
  if (renderDetails && _.isFunction(renderDetails)) {
    if (!renderDetails(item)) {
      onDetails = null;
    }
  }

  //cancel config
  let cancelTitle = t('CANCEL') // default
  if (renderCancel && _.isFunction(renderCancel)) {
    if (!renderCancel(item)) {
      onCancel = null;
    }
  }

  return (
    <td className="table__body--data right">
      {isSome(onReview) ? (
        <i
          className="icomoon icon-check-double align--v--middle spc--right--sml"
          onClick={() => onReview(item)}
          title={reviewTitle}
        >
        </i>
      ) : null}
      {isSome(onEdit) ? (
        <i
          className="icomoon icon-pencil-write align--v--middle spc--right--sml"
          onClick={() => onEdit(item)}
          title={editTitle}
        >
        </i>
      ) : null}
      {isSome(onDetails) ? (
        <i
          className="icomoon icon-task-list-to-do align--v--middle spc--right--sml"
          onClick={() => onDetails(item)}
          title={detailsTitle}
        >
        </i>
      ) : null}
      {isSome(onDelete) ? (
        <i
          className="icomoon icon-bin align--v--middle spc--right--sml"
          onClick={() => onDelete(item)}
          title={deleteTitle}
        >
        </i>
      ) : null}
      {isSome(onCancel) ? (
        <i
          className="icomoon icon-remove align--v--middle spc--right--sml"
          onClick={() => onCancel(item)}
          title={cancelTitle}
        >
        </i>
      ) : null}
    </td>
  );
}

export default defaultTemplate(BaasicTableActionsTemplate);
