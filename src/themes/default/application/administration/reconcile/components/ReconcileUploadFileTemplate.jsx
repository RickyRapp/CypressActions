import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { ReconcileCashedPreview } from 'application/administration/reconcile/components';

import {
    BaasicFormControls,
    EditFormContent,
    BaasicDropzone
} from 'core/components';

const ReconcileUploadFileTemplate = function ({ reconcileUploadFileViewStore }){

    const { form, fileUploadStore, isUploaded, uploadFile, response} = reconcileUploadFileViewStore;
    return (
        <div>
            {isUploaded ? (
                <ReconcileCashedPreview modalParams={response} />
            ):(
                <EditFormContent form={form}>
                    <div className=''>
                        <BaasicDropzone store={fileUploadStore} disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                        
                        <div className="type--right">
                            <span className="u-mar--right--sml">
                                <BaasicFormControls form={form} onSubmit={uploadFile} />
                            </span>
                        </div>
                    </div>
                 </EditFormContent>
            )}
        </div>
        )
};

ReconcileUploadFileTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    reconcileUploadFileViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ReconcileUploadFileTemplate);