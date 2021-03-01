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
        grant,
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
                    <div className="col col-sml-12 col-lrg-3 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.EDIT.BLANK_CERTIFICATE_CODE')}</div>
                        <span className="type--base type--color--opaque">
                            {grant.certificate.booklet.code}-{grant.certificate.code}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-3 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.EDIT.BLANK_BOOKLET_AMOUNT')}</div>
                        <span className="type--base type--color--opaque">
                            <FormatterResolver
                                item={{ amount: grant.amount }}
                                field='amount'
                                format={{ type: 'currency' }}
                            />
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-3 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.EDIT.BLANK_BOOKLET_MAX_AMOUNT')}</div>
                        <span className="type--base type--color--opaque">
                            <FormatterResolver
                                item={{ blankBookletMaxAmount: grant.donor.blankBookletMaxAmount }}
                                field='blankBookletMaxAmount'
                                format={{ type: 'currency' }}
                            />
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-3 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">Present balance</div>
                        <span className="type--base type--color--opaque">
                            <FormatterResolver
                                item={{ presentBalance: grant.donor.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />
                            <br />
                            <small>(Line of credit: <FormatterResolver
                                item={{ lineOfCredit: grant.donor.lineOfCredit }}
                                field='lineOfCredit'
                                format={{ type: 'currency' }}
                            />)</small>
                        </span>
                    </div>
                    <div className="form__group col col-lrg-12">
                        <NumericInputField field={form.$('blankCertificateValue')} />
                    </div>
                    {grant.certificate.denominationType.abrv === 'blank' &&
                        <React.Fragment>
                            <div className="form__group col col-lrg-12">
                                <React.Fragment>
                                    {isSome(grant.isCertificateApproved) &&
                                        <React.Fragment>
                                            {grant.isCertificateApproved &&
                                                <React.Fragment><label className="form__group__label">{t('SESSION.EDIT.DONOR_APPROVED_BLANK_AMOUNT')}</label><i className="u-icon u-icon--approve u-icon--base u-mar--left--tny"></i></React.Fragment>}
                                            {!grant.isCertificateApproved &&
                                                <label className="form__group__label">{t('SESSION.EDIT.DONOR_DOES_NOT_AGREE_WITH_BLANK_AMOUNT')}</label>}
                                        </React.Fragment>}
                                    {!isSome(grant.isCertificateApproved) &&
                                        <React.Fragment>
                                            {grant.certificateReviewToken ?
                                                <label className="form__group__label">{t('SESSION.EDIT.DONOR_DID_NOT_RESPOND_YET_ON_BLANK_AMOUNT')}</label>
                                                :
                                                <label className="form__group__label">{t('SESSION.EDIT.AGREE_EMAIL_NOT_SENT')}</label>}
                                        </React.Fragment>}

                                    <NullableSwitch
                                        value={form.$('isCertificateApproved').value}
                                        onChange={(value) => form.$('isCertificateApproved').set(value)}
                                        yesLabel="SESSION.EDIT.DONOR_APPROVES"
                                        noLabel="SESSION.EDIT.DONOR_DOES_NOT_APPROVE"
                                    />
                                </React.Fragment>
                            </div>
                        </React.Fragment>}
                </div>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                {!isSome(grant.isCertificateApproved) &&
                    <BaasicButton
                        onlyIconClassName="u-mar--bottom--tny u-mar--right--tny"
                        onlyIcon={false}
                        icon='u-icon u-icon--email u-icon--base'
                        className="btn btn--med btn--ghost u-mar--left--sml"
                        label={grant.certificateReviewToken ? t('SESSION.EDIT.SAVE_RESEND_APPROVE_EMAIL') : t('SESSION.EDIT.SAVE_SEND_APPROVE_EMAIL')}
                        onClick={saveAndSendReviewEmail}
                    />}
            </EditFormContent >
        </section >
    )
}

EditBlankCertificateTemplate.propTypes = {
    editBlankCertificateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(EditBlankCertificateTemplate);
