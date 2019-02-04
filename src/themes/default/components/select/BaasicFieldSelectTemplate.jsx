import React from 'react';
import { BaasicSelect } from 'core/components';
import { defaultTemplate } from 'core/utils';

function BaasicFieldSelect({ field, loading = false, ...other }) {
  return (
    <BaasicSelect
      {...other}
      multi
      isLoading={loading}
      onChange={field.sync}
      placeholder={field.placeholder}
      options={field.extra}
      value={field.value}
    />
  );
}

export default defaultTemplate(BaasicFieldSelect);
