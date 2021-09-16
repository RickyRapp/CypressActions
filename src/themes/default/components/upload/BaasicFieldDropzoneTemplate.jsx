import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropzone } from 'core/components';

const BaasicFieldDropzoneTemplate = function (props) {
     const {
          field,
          store,
          loading
     } = props;

     function onDelete() {
          field.clear();
     }

     return (
          <BaasicDropzone store={store} loading={loading} disabled={field.disabled} onDelete={onDelete} />
     )
}

BaasicFieldDropzoneTemplate.propTypes = {
     store: PropTypes.object.isRequired,
     field: PropTypes.object.isRequired,
     loading: PropTypes.bool
};

export default defaultTemplate(BaasicFieldDropzoneTemplate);
