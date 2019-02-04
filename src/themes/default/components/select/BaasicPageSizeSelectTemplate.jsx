import React from 'react';
import { BaasicSelect } from 'core/components';
import { defaultTemplate } from 'core/utils';

function BaasicPageSizeSelect({ queryUtility, ...other }) {
  return (
    <BaasicSelect
      {...other}
      onChange={selectedOption =>
        queryUtility.changePageSize(selectedOption.value)
      }
    />
  );
}

export default defaultTemplate(BaasicPageSizeSelect);
