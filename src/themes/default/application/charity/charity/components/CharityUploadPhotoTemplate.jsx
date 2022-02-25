import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    EditFormContent,
    BaasicFormControls,
    BaasicDropzone
} from 'core/components'
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

const CharityUploadPhotoTemplate = function ({t, charityUploadPhotoViewStore}){

    const {
        imageUploadStore,
        form,
        isEditEnabled,
        item,
        onEnableEditClick
    } = charityUploadPhotoViewStore;

    return(
        <div>
            <EditFormContent form={form}>
                <div className="row">
					<div className="col col-sml-12 col-lrg-3">
                            <h3 className=" u-mar--bottom--med">
                                {t('CHARITY.UPLOAD_PHOTO.TITLE')}
                             </h3>
                    </div>
                    {isEditEnabled ? (
                        <React.Fragment>
                            <div className='col col-sml-12 col-lrg-12'>
                                <div className='card--med card--primary'>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-6 u-mar--bottom--sml">
                                    <BaasicDropzone store={imageUploadStore} disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                                    </div>
                                    <div className="col-md-4 px-0">
                                    {  
                                        item ? ( <img alt=""  src={URL.createObjectURL(item)} /> ) : null
                                    }
                                    </div>
                                </div>

                            <div className="col col-sml-12 info-card--footer">
								<BaasicButton
									type="button"
									className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
									onClick={onEnableEditClick}
									label="Cancel"
								/>
								<BaasicFormControls form={form} onSubmit={form.onSubmit} />
							</div>
                </div>
                </div>
                </React.Fragment>
                ) : (
                    <div className="col col-sml-12 col-lrg-9" title="Click to edit" onClick={onEnableEditClick}>
							<div className="row info-card--scale">
								<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Photo:</p>
									<p className="type--base type--wgt--bold">
                                        {  
                                            item ? ( <img alt=""  src={URL.createObjectURL(item)} /> ) : null
                                        }
									</p>
								</div>
							</div>
					</div>
                    )}
                </div>
            </EditFormContent>
        </div>
    );


}

CharityUploadPhotoTemplate.propTypes = {
    charityUploadPhotoViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityUploadPhotoTemplate);