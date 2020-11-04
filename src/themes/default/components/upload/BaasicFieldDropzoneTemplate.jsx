import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from '@progress/kendo-react-upload';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicDropzone } from 'core/components';
import { isSome } from 'core/utils';

const BaasicFieldDropzoneTemplate = function (props) {
     const {
          field,
          store,
          loading
     } = props;

     function onDelete(e) { //eslint-disable-line
          field.clear();
     }

     return (
          <BaasicDropzone store={store} loading={loading} disabled={field.disabled} onDelete={onDelete} />
     )
}

BaasicFieldDropzoneTemplate.propTypes = {
     store: PropTypes.object.isRequired,
     field: PropTypes.object.isRequired
};

export default defaultTemplate(BaasicFieldDropzoneTemplate);
