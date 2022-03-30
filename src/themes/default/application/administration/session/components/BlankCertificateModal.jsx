import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    NumericInput,
    BaasicButton,
    BaasicDropzone
} from 'core/components'

const RemoveSessionCertificateModal = function ({ modalParams, t }) {
    const {
        certificate,
        onClick, 
        isCharityAccount,
        imageUploadStore,
        isEdit
    } = modalParams.data;

    return (
        <section>
            <h3 className="u-mar--bottom--med">{t('SESSION.CREATE.STEP3.BLANK_CERTIFICATE_AMOUNT')}</h3>
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <div>
                        <label className="form__group__label">{t('SESSION.CREATE.STEP3.BLANK_CERTIFICATE_CODE')}</label>
                        {certificate &&
                            <span className={"input input--lrg input--text input--disabled"}>{certificate.bookletCode}-{certificate.certificateCode}</span>}
                    </div>
                </div>
                <div className="form__group col col-lrg-12">
                    <NumericInput
                        value={isEdit ? certificate.denominationTypeValue : (certificate.certificateValue ? certificate.certificateValue : 0)}
                        onChange={(event) => certificate.certificateValue = event.target.value}
                        label='SESSION.CREATE.STEP3.CERTIFICATE_VALUE_LABEL'
                        placeholder='SESSION.CREATE.STEP3.CERTIFICATE_VALUE_PLACEHOLDER'
                        showLabel={true}
                        required={true}>
                    </NumericInput>
                </div>
                
                {isCharityAccount && <p className="form__group col col-lrg-12">You are required to upload the images for the blank checks or alternatively you can remove them and submit them by mail</p> }
                {isCharityAccount && <div className="form__Group col col-lrg-6">
                {/* disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)}  */}
                    <BaasicDropzone store={imageUploadStore} />
                </div>}
                <div className="form__group col col-lrg-12 u-mar--top--med">
                    <BaasicButton
                        className="btn btn--base btn--primary"
                        label='SESSION.CREATE.STEP3.SET_BLANK_CERTIFICATE_VALUE'
                        onClick={() => onClick(certificate)}
                        disabled={certificate.certificateValue < 1 ? true : false}>
                    </BaasicButton>
                </div>
            </div>
        </section>
    )
}

RemoveSessionCertificateModal.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(RemoveSessionCertificateModal);
