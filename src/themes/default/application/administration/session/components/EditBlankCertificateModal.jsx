import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    NumericInput,
    BaasicButton,
    NullableSwitch
} from 'core/components'
import { renderIf, isSome } from 'core/utils';

const EditBlankCertificateModal = function ({ modalParams, t, maxAmountError }) {
    const {
        sessionCertificate,
        onSubmit,
        sendApproveEmail,
        imageUploadStore
    } = modalParams.data;

    return (
        <section>
            <h3 className="u-mar--bottom--med">{t('SESSION.EDIT.BLANK_CERTIFICATE_AMOUNT')}</h3>
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <div>
                        <label className="form__group__label">{t('SESSION.EDIT.BLANK_CERTIFICATE_CODE')}</label>
                        <span className={"input input--lrg input--text input--disabled"}>{sessionCertificate.certificate.booklet.code}-{sessionCertificate.certificate.code}</span>
                    </div>
                </div>
                <div className="form__group col col-lrg-12">
                    <NumericInput
                        value={sessionCertificate.blankCertificateValue}
                        onChange={(event) => sessionCertificate.blankCertificateValue = event.target.value}
                        label='SESSION.EDIT.CERTIFICATE_VALUE_LABEL'
                        placeholder='SESSION.EDIT.CERTIFICATE_VALUE_PLACEHOLDER'
                        showLabel={true}
                        required={true}>
                    </NumericInput>
                    {renderIf(maxAmountError)(<div
                        className="validation__message"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{t('SESSION.EDIT.MAX_BLANK_CERTIFICATE_AMOUNT_ERROR')}</div>)}
                </div>
                {sessionCertificate.certificate.booklet.denominationType.abrv === 'blank' &&
                    <div className="form__group col col-lrg-12">
                        <div>
                            {isSome(sessionCertificate.donorApproved) &&
                                <React.Fragment>
                                    {sessionCertificate.donorApproved &&
                                        <label className="form__group__label">{t('SESSION.EDIT.DONOR_APPROVED_BLANK_AMOUNT')}</label>}
                                    {!sessionCertificate.donorApproved &&
                                        <label className="form__group__label">{t('SESSION.EDIT.DONOR_DOES_NOT_AGREE_WITH_BLANK_AMOUNT')}</label>}
                                </React.Fragment>}
                            {!isSome(sessionCertificate.donorApproved) &&
                                <React.Fragment>
                                    {isSome(sessionCertificate.donorApproveToken) &&
                                        <label className="form__group__label">{t('SESSION.EDIT.DONOR_DID_NOT_RESPOND_YET_ON_BLANK_AMOUNT')}</label>}
                                    {!isSome(sessionCertificate.donorApproveToken) &&
                                        <label className="form__group__label">{t('SESSION.EDIT.AGREE_EMAIL_NOT_SENT')}</label>}
                                </React.Fragment>}
                            <NullableSwitch
                                value={sessionCertificate.donorApproved}
                                onChange={(value) => sessionCertificate.donorApproved = value}
                            />
                            {!isSome(sessionCertificate.donorApproved) &&
                                <BaasicButton
                                    className="btn btn--icon"
                                    icon='u-icon u-icon--email-pass u-icon--base'
                                    label='SESSION.EDIT.SEND_APPROVE_EMAIL'
                                    onlyIcon={true}
                                    onClick={() => sendApproveEmail(sessionCertificate)}>
                                </BaasicButton>
                            }
                        </div>
                    </div>}
                    {isCharityAccount && <p className="form__group col col-lrg-12">You are required to upload the images for the blank checks or alternatively you can remove them and submit them by mail</p> }
                <div className="form__Group col col-lrg-6">
                {/* disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)}  */}
                    <BaasicDropzone store={imageUploadStore} />
                </div>
                <div className="form__group col col-lrg-12 u-mar--top--med">
                    <BaasicButton
                        className="btn btn--base btn--primary"
                        label='SESSION.EDIT.SET_BLANK_CERTIFICATE_VALUE'
                        onClick={() => onSubmit({
                            id: sessionCertificate.id,
                            certificateValue: sessionCertificate.blankCertificateValue
                        })}>
                    </BaasicButton>
                </div>
            </div>
        </section>
    )
}

EditBlankCertificateModal.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    maxAmountError: PropTypes.bool.isRequired,
};

export default defaultTemplate(EditBlankCertificateModal);
