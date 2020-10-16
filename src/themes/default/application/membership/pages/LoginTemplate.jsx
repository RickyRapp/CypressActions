import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton } from 'core/components';
import logo from 'themes/assets/img/logo-donors2.png';

function LoginTemplate({ currentView, t }) {
    const {
        loginForm,
        routes
    } = currentView;
    return (
        <section className="w--400--px u-align--h--center">
            <div className="type--center">
                <img src={logo} className="u-padd--bottom--lrg u-padd--top--lrg w--300--px" alt="Logo" />
            </div>
            <div className="box">
                <form className="form card card--lrg card--primary" onSubmit={loginForm.onSubmit}>
                    <h4 className="box__title u-mar--bottom--sml">{t('LOGIN.TITLE')}</h4>
                    <p className="u-mar--bottom--sml type--color--dark">{t('LOGIN.DESCRIPTION')}</p>
                    <div className="u-mar--bottom--sml">
                        <BasicInput field={loginForm.$('email')} />
                    </div>
                    <div className="u-mar--bottom--med">
                        <BasicInput field={loginForm.$('password')} />
                    </div>
                    {loginForm.error && (
                        <div>
                            <p className="type--color--warning type--small u-mar--bottom--med">{loginForm.error}</p>
                        </div>
                    )}
                    <div className="u-group u-mar--bottom--sml">
                        <div className="u-pull">
                            <BaasicButton
                                className="btn btn--base btn--primary"
                                type="submit"
                                disabled={loginForm.submitting}
                                icon={loginForm.submitting || loginForm.validating ? 'loader--login' : ''}
                                label={t('LOGIN.SIGNIN_BUTTON')}
                            />
                        </div>
                        <div className="u-push">
                            <a className="type--base u-mar--top--sml u-display--b type--right" onClick={routes.forgotPassword}>
                                {t('LOGIN.FORGOT_PASSWORD_BUTTON')}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

LoginTemplate.propTypes = {
    currentView: PropTypes.object,
    t: PropTypes.func,
};

export default defaultTemplate(LoginTemplate);
