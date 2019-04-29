import React from 'react';
import { isSome, renderIf } from 'core/utils';
import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';

function BaasicTableRowTemplate({
  item,
  columns,
  actions,
  actionsComponent,
  actionsConfig,
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
        <wrap.component actions={actions} item={item} actionsConfig={actionsConfig} />
      ) : null}
    </tr>
  );
}

function renderRow(item, column) {
  if (column.permissions && !column.permissions.read) {
    return false;
  }
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

  let itemValue = getColumnValue(item, column.key);

  if (column.type === 'date') {
    itemValue = moment(itemValue).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(column.format);
  }

  if (column.type === 'currency') {
    //TODO: add support for currency format
    //column.format
    itemValue = `$${itemValue}`;
  }

  if (column.type === 'lookup' && column.lookup) {
    if (itemValue) {
      itemValue = _.find(column.lookup, { id: itemValue }).name;
    }
    else {
      if (column.defaultValue) {
        itemValue = column.defaultValue;
      }
    }
  }

  if (column.type === 'function' && column.function && _.isFunction(column.function)) {
    itemValue = column.function(itemValue);
  }

  if (column.type === 'bool') {
    if (itemValue === 'true') {
      itemValue = "Yes";
    }
    else if (itemValue === 'false') {
      itemValue = "No";
    }
    else {
      itemValue = "-"
    }
  }

  if (column.type === 'object') {
    let baseItem = '';
    _.forEach(column.additionalColumns, (childColumn, index) => {
      let objectValue = item[column.key] !== undefined && item[column.key] !== null ? item[column.key] : null;
      if (!objectValue) {
        objectValue = getColumnValue(item, column.key);
      }
      let columnValue = getColumnValue(objectValue, childColumn.key)
      if (columnValue) {
        baseItem += columnValue + ((index === (column.additionalColumns.length - 1)) ? '' : column.separator);
      }
    });

    if (!baseItem) {
      baseItem = column.defaultValue;
    }
    itemValue = baseItem;
  }

  return (
    <td key={column.key} className="table__body--data">
      <div {...rowProps}>{itemValue}</div>
    </td>
  );
}

function getColumnValue(item, key) {
  let data = item[key] !== undefined && item[key] !== null
    ? item[key]
    : tryGetColumnValue(item, key);
  return data;
}

function tryGetColumnValue(item, key) {
  if (isSome(key) && _.includes(key, '.')) {
    let segments = key.split('.');
    if (segments.length > 1) {
      let segmentValue = item;
      segments.map(function (segment) {
        if (segmentValue) {
          segmentValue = segmentValue[segment];
        }
      });
      return segmentValue;
    }
  }
  return '';
}

export default BaasicTableRowTemplate;
