import React from 'react';
import { isSome, renderIf } from 'core/utils';
import _ from 'lodash';

function BaasicTableRowTemplate({
  item,
  columns,
  actions,
  actionsComponent,
  onRowClick
}) {
  const rowProps = {};

  if (onRowClick) {
    rowProps.onClick = () => onRowClick(item);
  }

  const wrap = {
    component: actionsComponent
  };

  return (
    <tr {...rowProps}>
      {columns.map(column => renderRow(item, column))}
      {isSome(actions) ? (
        <wrap.component actions={actions} item={item} />
      ) : null}
    </tr>
  );
}

function renderRow(item, column) {
  const rowProps = {};

  if (column.onClick) {
    rowProps.onClick = () => column.onClick(item, column);
  }

  if (column.row) {
    return (
      <React.Fragment key={column.key}>
        <column.row {...rowProps} item={item} column={column} />
      </React.Fragment>
    );
  }

  const itemValue =
    item[column.key] !== undefined && item[column.key] !== null
      ? item[column.key].toString()
      : tryGetColumnValue(item, column.key);
  return (
    <td key={column.key} className="table__body--data">
      <div {...rowProps}>{itemValue}</div>
    </td>
  );
}

function tryGetColumnValue(item, key) {
  if (isSome(key) && _.includes(key, '.')) {
    var segments = key.split('.');
    if (segments.length > 1) {
      let segmentValue = item;
      segments.map(function (segment) {
        segmentValue = segmentValue[segment];
      });
      return segmentValue;
    }
  }
  return '';
}

export default BaasicTableRowTemplate;
