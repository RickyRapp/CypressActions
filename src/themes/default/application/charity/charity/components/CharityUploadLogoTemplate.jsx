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

const CharityUploadLogoTemplate = function ({ t, charityUploadLogoViewStore }) {

    const {
        imageUploadStore,
        form,
        onEnableEditClick,
        item
    } = charityUploadLogoViewStore;

    return (
        <div>
            <EditFormContent form={form}>
                <div className="card--med card--primary u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">
                        {t('CHARITY.UPLOAD_LOGO.TITLE')}
                    </h3>
                    <div>
                        <div className="row row--form u-mar--bottom--med">
                            <BaasicDropzone store={imageUploadStore} disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                            <div className="col col-sml-4">
                                {item ? (<img alt="" src={URL.createObjectURL(item)} />) : null}
                            </div>
                        </div>
                        <div className="info-card--footer">
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
            </EditFormContent>
        </div>
    );
}

CharityUploadLogoTemplate.propTypes = {
    charityUploadLogoViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityUploadLogoTemplate);