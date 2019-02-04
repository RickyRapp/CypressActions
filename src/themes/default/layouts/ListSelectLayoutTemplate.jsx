import React from 'react';
import _ from 'lodash';
import { ListLayout, PageHeader } from 'core/layouts';
import { BaasicDropdown } from 'core/components';
import { defaultTemplate } from 'core/utils';

function ListSelectLayoutTemplate({
  dropdownStore,
  children,
  t,
  loading,
  hidesContent = true,
  emptyComponent,
  emptyMessage = 'LIST_SELECT_LAYOUT.EMPTY_MESSAGE',
  ...other
}) {
  const isLoading = !_.isNil(loading) ? loading : dropdownStore.loading;

  return (
    <ListLayout loading={isLoading}>
      <PageHeader>
        <BaasicDropdown className="input--dropdown" store={dropdownStore} />
      </PageHeader>
      {!hidesContent || dropdownStore.value
        ? typeof children === 'function'
          ? children()
          : children
        : emptyComponent || <div>{t(emptyMessage)}</div>}
    </ListLayout>
  );
}
export default defaultTemplate(ListSelectLayoutTemplate);
