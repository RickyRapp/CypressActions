import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    NullableSwitch,
    BaasicFormControls,
    ApplicationEmptyState,
    EditFormContent,
    NumericInputField,
    FormatterResolver
} from 'core/components'
import { isSome } from 'core/utils';

const EditBlankCertificateTemplate = function ({ editBlankCertificateViewStore, t }) {
    const {
        contentLoading,
        sessionCertificate,
        saveAndSendReviewEmail,
        form
    } = editBlankCertificateViewStore;

    return (
        <section>
            <EditFormContent
                form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={contentLoading}>
                <h3 className="u-mar--bottom--med">{t('SESSION.EDIT.BLANK_CERTIFICATE_AMOUNT_TITLE')}</h3>
                <div className="row">
                    <div className="col col-sml-12 col-lrg-6">
                        <div className="form__group__label">{t('SESSION.EDIT.BLANK_CERTIFICATE_CODE')}</div>
                        <span className="input--preview">
                            {sessionCertificate.certificate.booklet.code}-{sessionCertificate.certificate.code}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-6">
                        <div className="form__group__label">{t('SESSION.EDIT.BLANK_BOOKLET_MAX_AMOUNT')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ blankBookletMaxAmount: sessionCertificate.certificate.booklet.donor.blankBookletMaxAmount }}
                                field='blankBookletMaxAmount'
                                format={{ type: 'currency' }}
                            />
                        </span>
                    </div>
                    <div className="form__group col col-lrg-12">
                        <NumericInputField field={form.$('blankCertificateValue')} />
                    </div>
                    {sessionCertificate.certificate.booklet.denominationType.abrv === 'blank' &&
                        <React.Fragment>
                            <div className="form__group col col-lrg-12">
                                <React.Fragment>
                                    {isSome(sessionCertificate.isApproved) &&
                                        <React.Fragment>
                                            {sessionCertificate.isApproved &&
                                                <label className="form__group__label">{t('SESSION.EDIT.DONOR_APPROVED_BLANK_AMOUNT')}</label>}
                                            {!sessionCertificate.isApproved &&
                                                <label className="form__group__label">{t('SESSION.EDIT.DONOR_DOES_NOT_AGREE_WITH_BLANK_AMOUNT')}</label>}
                                        </React.Fragment>}
                                    {!isSome(sessionCertificate.isApproved) &&
                                        <React.Fragment>
                                            {sessionCertificate.reviewToken ?
                                                <label className="form__group__label">{t('SESSION.EDIT.DONOR_DID_NOT_RESPOND_YET_ON_BLANK_AMOUNT')}</label>
                                                :
                                                <label className="form__group__label">{t('SESSION.EDIT.AGREE_EMAIL_NOT_SENT')}</label>}
                                        </React.Fragment>}

                                    <NullableSwitch
                                        value={form.$('isApproved').value}
                                        onChange={(value) => form.$('isApproved').set(value)}
                                        yesLabel="SESSION.EDIT.DONOR_APPROVES"
                                        noLabel="SESSION.EDIT.DONOR_DOES_NOT_APPROVE"
                                    />
                                </React.Fragment>
                            </div>
                        </React.Fragment>}
                </div>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                <BaasicButton
                    icon='u-icon u-icon--email-pass u-icon--base'
                    className="btn btn--base btn--ghost"
                    label={sessionCertificate.reviewToken ? t('SESSION.EDIT.SAVE_RESEND_APPROVE_EMAIL') : t('SESSION.EDIT.SAVE_SEND_APPROVE_EMAIL')}
                    onClick={saveAndSendReviewEmail}
                />
            </EditFormContent >
        </section >
    )
}

EditBlankCertificateTemplate.propTypes = {
    editBlankCertificateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(EditBlankCertificateTemplate);
