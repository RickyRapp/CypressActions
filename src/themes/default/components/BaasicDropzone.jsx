import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from '@progress/kendo-react-upload';
import { defaultTemplate } from 'core/hoc';

function BaasicDropzoneTemplate({acceptFiles, onFilesDrop, loading}){
     return <React.Fragment>
          <div className='w--100'>
               <Upload 
                    multiple={true}
                    batch={false}
                    restrictions={{allowedExtensions: [acceptFiles]}}
                    onAdd={onFilesDrop}
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
     loading: PropTypes.bool      
 };

export default defaultTemplate(BaasicDropzoneTemplate);