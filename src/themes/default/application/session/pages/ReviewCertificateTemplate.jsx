import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { EditFormContent, BaasicButton, FormatterResolver } from 'core/components';

const ReviewCertificateTemplate = function ({ reviewCertificateViewStore, t }) {
    const {
        form,
        approve,
        disapprove,
        sessionCertificate
    } = reviewCertificateViewStore;

    return (
        <section>
            <div className='login__top'>
                <img className='login__top__logo' src={require('themes/assets/img/logo.svg')} alt='Logo' />
            </div>
            <div className='container--login'>
                <EditFormContent form={form}>
                    <h1 className="u-mar--bottom--med">{t('SESSION.REVIEW.TITLE')}</h1>
                    <p className='u-mar--bottom--med type--color--dark'>
                        {t('SESSION.REVIEW.DESCRIPTION')}
                    </p>

                    {sessionCertificate &&
                        <React.Fragment>
                            <p>{sessionCertificate.certificate.booklet.code}-{sessionCertificate.certificate.code}</p>
                            <FormatterResolver
                                item={{ value: sessionCertificate.blankCertificateValue }}
                                field='value'
                                format={{ type: 'currency' }}
                            />

                        </React.Fragment>}

                    <div className="row">
                        <div className="form__group col col-lrg-6">
                            <BaasicButton
                                className="btn btn--base btn--primary"
                                onClick={approve}
                                disabled={form.submitting || form.validating}
                                label={t('SESSION.REVIEW.BUTTON.APPROVE')}
                            />
                        </div>

                        <div className="form__group col col-lrg-6">
                            <BaasicButton
                                className="btn btn--base btn--secondary"
                                onClick={disapprove}
                                disabled={form.submitting || form.validating}
                                label={t('SESSION.REVIEW.BUTTON.DISAPPROVE')}
                            />
                        </div>
                    </div>
                    {form.error &&
                        <div>
                            <p className='type--color--warning type--small u-mar--bottom--med'>
                                {form.error}
                            </p>
                        </div>
                    }
                </EditFormContent>
            </div>
        </section >
    )
};

ReviewCertificateTemplate.propTypes = {
    reviewCertificateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ReviewCertificateTemplate);