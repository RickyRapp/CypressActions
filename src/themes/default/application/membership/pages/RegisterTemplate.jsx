import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BasicFieldRecaptcha, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function RegisterTemplate({ viewStore }) {
    const { registerForm, loading, navigateToLoginPage } = viewStore;
    return (
        <section>
            <div className='login__top'>
                <img className='login__top__logo' src={require('themes/assets/img/logo.svg')} alt='Logo' />
            </div>
            <div className='container--login'>
                <form className='form card card--lrg card--primary' onSubmit={registerForm.onSubmit}>
                    <h1 className='u-mar--bottom--med'>Register</h1>
                    <div className="form__group">
                        <BasicInput field={registerForm.$('username')} />
                    </div>
                    <div className="form__group">
                        <BasicInput field={registerForm.$('password')} />
                    </div>
                    <div className="form__group">
                        <BasicInput field={registerForm.$('confirmPassword')} />
                    </div>
                    <div className="form__group">
                        <BasicFieldRecaptcha field={registerForm.$('botProtection')} />
                    </div>
                    {registerForm.error && (
                        <p className='type--color--warning type--small u-mar--bottom--med'>
                            {registerForm.error}
                        </p>
                    )}
                    <p>
                        <BaasicButton
                            type='submit'
                            disabled={registerForm.submitting}
                            label='Register'
                            className="btn btn--base btn--primary"
                        />
                        {loading && (
                            <span style={{ paddingLeft: 10 }}>Registering...</span>
                        )}

                        <BaasicButton
                            type='button'
                            onClick={navigateToLoginPage}
                            disabled={registerForm.submitting}
                            label='Back to login'
                            className="btn btn--base btn--primary"
                        />
                    </p>
                </form>
            </div>
        </section>
    );
}

RegisterTemplate.propTypes = {
    viewStore: PropTypes.object
};

export default defaultTemplate(RegisterTemplate);
