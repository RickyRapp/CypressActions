import React from 'react';
import { defaultTemplate } from 'core/utils';
import { SearchFilterTemplate } from 'themes/components';

function SearchFilter(props) {
  return <SearchFilterTemplate {...props} />;
}

export default defaultTemplate(SearchFilter);
