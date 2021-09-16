import React from 'react';

import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { Loader } from 'core/components';

function ActivationConfirmTemplate({ viewStore, t }) {
    const {
        routes,
        errorMessage,
        loadingActivation
    } = viewStore;

    if (loadingActivation) return <Loader />;

    if (errorMessage === null) {
        return (
        <section>
            <div className='login__top'>
                <img className='login__top__logo' src={require('themes/assets/img/logo.svg')} alt='Logo' />
            </div>
            <div className='container--login'>
                <div className='form card card--lrg card--primary'>                  
                    <p className="u-mar--bottom--med">{t('REGISTER.ACTIVATION_MESSAGE')}</p>
                    <div className="type--center">
                        <a className='btn btn--base btn--primary' onClick={routes.dashboard}>Go to Dashboard</a>
                    </div>
                </div>
            </div>
        </section>
        );
    } else {
        return <div>{t(errorMessage)}</div>;
    }
}

ActivationConfirmTemplate.propTypes = {
    viewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ActivationConfirmTemplate);
