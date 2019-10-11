import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from '@progress/kendo-react-upload';
import { defaultTemplate } from 'core/hoc';

function BaasicDropzoneTemplate({ acceptFiles, onFilesDrop, loading, multiple = true, disabled = false }) {
     return <React.Fragment>
          <div>
               <Upload
                    multiple={multiple}
                    batch={false}
                    restrictions={{ allowedExtensions: acceptFiles }}
                    onAdd={onFilesDrop}
                    disabled={disabled}
                    withCredentials={false}>
               </Upload>
               {loading ? <div className='loader--overlay'>
                    <div className='center'>
                         <div className='lds-ring'>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                         </div>
                         <div>Uploading...</div>
                    </div>
               </div>
                    : null}

          </div>
     </React.Fragment>
}

BaasicDropzoneTemplate.propTypes = {
     acceptFiles: PropTypes.array,
     onFilesDrop: PropTypes.func,
     loading: PropTypes.bool,
     disabled: PropTypes.bool,
     multiple: PropTypes.bool
};

export default defaultTemplate(BaasicDropzoneTemplate);
