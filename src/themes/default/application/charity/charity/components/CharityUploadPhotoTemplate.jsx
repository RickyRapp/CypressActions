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

const CharityUploadPhotoTemplate = function ({ t, charityUploadPhotoViewStore }) {

    const {
        imageUploadStore,
        form,
        item,
        onEnableEditClick
    } = charityUploadPhotoViewStore;

    return (
        <div className="card--med card--primary">
            <EditFormContent form={form} formClassName={" "}>
                <h3 className=" u-mar--bottom--med">
                    {t('CHARITY.UPLOAD_PHOTO.TITLE')}
                </h3>
                <div>
                    <div className="row row--form">
                        <BaasicDropzone store={imageUploadStore} disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                        <div className="col col-sml-12 col-lrg-4">
                            {
                                item ? (<img alt="" src={URL.createObjectURL(item)} />) : null
                            }
                        </div>
                    </div>

                    <div className="info-card--footer">
                        {/* <BaasicButton
                            type="button"
                            className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
                            onClick={onEnableEditClick}
                            label="Cancel"
                        /> */}
                        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                    </div>
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