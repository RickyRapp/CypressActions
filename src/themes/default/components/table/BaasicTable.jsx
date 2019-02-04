import React from 'react';
import {
  BaasicTableRow,
  BaasicPager,
  BaasicPageSizeSelect
} from 'core/components';
import { isSome, renderIf, defaultTemplate } from 'core/utils';
import { BaasicTableActions } from 'core/components';

function hasAction(actions) {
  return actions && (actions.onEdit || actions.onDelete);
}

function BaasicTableTemplate({ tableStore, actionsComponent, ...otherProps }) {
  const {
    data,
    config: { columns, actions },
    queryUtility
  } = tableStore;
  actionsComponent = actionsComponent || BaasicTableActions;
  const pageSizeOptions = [
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' }
  ];

  return (
    <div className="row">
      <div className="col col-med-12 card card--clear">
        <table className="table w--100">
          <thead className="table__head">
            <tr>
              {columns.map(column => {
                const headerProps = {};

                if (column.onHeaderClick) {
                  headerProps.onClick = () => column.onHeaderClick(column);
                } else if (isSome(actions) && isSome(actions.onSort)) {
                  headerProps.onClick = () => actions.onSort(column);
                }

                if (column.header) {
                  return (
                    <React.Fragment key={column.key}>
                      <column.header {...headerProps} column={column} />
                    </React.Fragment>
                  );
                }

                return (
                  <th
                    {...headerProps}
                    key={column.key}
                    className="table__head--data"
                  >
                    <div>{column.title}</div>
                  </th>
                );
              })}
              {renderIf(hasAction(actions))(
                <th className="table__head--data right">
                  <div>Actions</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="table__body">
            {data.map(item => {
              return (
                <BaasicTableRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  actions={actions}
                  actionsComponent={actionsComponent}
                  {...otherProps}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <BaasicPager queryUtility={queryUtility} />
      <BaasicPageSizeSelect
        queryUtility={queryUtility}
        options={pageSizeOptions}
        placeholder="Select page size"
      />
    </div>
  );
}

export default defaultTemplate(BaasicTableTemplate);
