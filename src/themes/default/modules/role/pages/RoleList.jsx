import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';

function RoleListTemplate({ currentView, ...props }) {
  const { tableStore, queryUtility, loaderStore, routes } = currentView;

  return (
    <ListLayout loading={loaderStore.loading}>
      <div className="spc--bottom--sml">
        <TableFilter queryUtility={queryUtility} />
      </div>
      <BaasicTable tableStore={tableStore} loading={loaderStore.loading} />
    </ListLayout>
  );
}

export default defaultTemplate(RoleListTemplate);
