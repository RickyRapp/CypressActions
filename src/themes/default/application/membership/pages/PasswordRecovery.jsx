import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicRecaptcha, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import logo from 'themes/assets/img/logo.svg';

function PasswordRecoveryTemplate({ currentView, t }) {
    const { form, loading, onVerifyRecaptcha, goToLogin } = currentView;
    return (
        <section >
            <img
                className='w--160--px display--b align--h--center'
                src={logo}
                alt='Logo'
            />
            <form className='form card card--med card--primary spc--top--med' onSubmit={form.onSubmit}>
                <h5 className='spc--bottom--sml'>{t('PASSWORD_RECOVERY.TITLE')}</h5>
                <p className='spc--bottom--med type--color--dark'>
                    {t('PASSWORD_RECOVERY.DESCRIPTION')}
                </p>
                <div className='form__group'>
                    <BasicInput field={form.$('userName')} />
                </div>
                <div className='form__group spc--top--med'>
                    <BaasicRecaptcha verifyCallback={onVerifyRecaptcha} />
                </div>
                {
                    form.error && (
                        <div>
                            <p className='type--color--warning'>{form.error}</p>
                        </div>
                    )
                }
                <div className='spc--top--sml'>
                    <BaasicButton className='btn btn--med btn--tertiary display--ib' type='submit' label={t('PASSWORD_RECOVERY.RESET_BUTTON')} disabled={form.submitting || form.validating} />
                    <a className='btn btn--med btn--ghost spc--left--tny' onClick={goToLogin}>{t('PASSWORD_RECOVERY.CANCEL_BUTTON')}</a>
                    {loading && <span className='spc--top--tny display--ib'>{t('PASSWORD_RECOVERY.LOGGING_IN')}</span>}
                </div>
            </form>
        </section>
    )
}

PasswordRecoveryTemplate.propTypes = {
    currentView: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(PasswordRecoveryTemplate);
