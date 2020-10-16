import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function RegistrationSuccessTemplate({ viewStore, t }) {
    const { routes } = viewStore;

    return <section>
            <div className='login__top'>
                <img className='login__top__logo' src={require('themes/assets/img/logo.svg')} alt='Logo' />
            </div>
            <div className='container--login'>
                <div className='form card card--lrg card--primary'>
                    <h1 className='u-mar--bottom--med'>{t('REGISTER.SUCCESSFULL_REGISTRATION')}</h1>
                    <p className="u-mar--bottom--med">{t('REGISTER.ACTIVATION_LINK_SENT')}</p>
                    <div className="type--center">
                        <a className='btn btn--base btn--primary' onClick={routes.login}>Go to Login</a>
                    </div>
                </div>
            </div>
        </section>;
}

RegistrationSuccessTemplate.propTypes = {
    viewStore: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(RegistrationSuccessTemplate);