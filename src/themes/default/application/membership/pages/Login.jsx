import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, Loader, BaasicButton } from 'core/components';

function LoginTemplate({ currentView, t }) {
    const { loginForm, loaderStore: {loading}, routes } = currentView;
    return <section>
            <div className='login__top'>
                <img className='login__top__logo' src={require('themes/assets/img/logo.svg')} alt='Logo' />
            </div>
            <div className='container--login'>
                <form className='form card card--lrg card--primary' onSubmit={loginForm.onSubmit}>
                    <h1 className='u-mar--bottom--med'>{t('LOGIN.TITLE')}</h1>
                    <p className='u-mar--bottom--med type--color--dark'>
                        {t('LOGIN.DESCRIPTION')}
                    </p>
                    <div className='form__group u-mar--bottom--med'>
                        <BasicInput field={loginForm.$('email')} />
                    </div>
                    <div className='form__group u-mar--bottom--lrg'>
                        <BasicInput field={loginForm.$('password')} />
                    </div>
                    {loginForm.error && 
                        <div>
                            <p className='type--color--warning type--small u-mar--bottom--med'>
                                {loginForm.error}
                            </p>
                        </div>
                    }
                    <div className='u-group u-mar--bottom--med'>
                        <div className='u-pull'>
                            <a className='btn btn--link btn--base btn--base--link u-mar--top--tny display--ib' onClick={routes.forgotPassword}>
                                {t('LOGIN.FORGOT_PASSWORD_BUTTON')}
                            </a>
                        </div>
                        <div className='u-push'>
                            <BaasicButton className='btn btn--base btn--primary' type='submit' disabled={loginForm.submitting} icon={loginForm.submitting || loginForm.validating ? 'synchronize-arrows-1 rotate' : ''} label={t('LOGIN.SIGNIN_BUTTON')} />
                            {loading && 
                                <span className='loader--login u-padd--top--med'>
                                    <Loader />
                                </span>
                            }
                        </div>
                    </div>
                    <div className='u-separator--primary u-mar--bottom--med'></div>
                    <button type='button' className='btn btn--base btn--ghost btn--block' onClick={routes.register}>{t('REGISTER.SIGN_UP_BUTTON')}</button>

                </form>
            </div>
        </section>;
}

LoginTemplate.propTypes = {
    currentView: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(LoginTemplate);
