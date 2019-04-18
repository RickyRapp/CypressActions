import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, Loader, BaasicButton } from 'core/components';

function LoginTemplate({ currentView, t }) {
  const { loginForm, loading, routes } = currentView;
  return (
    <section className="w--300--500 align--h--center padd--top--med">
      <img className="w--160--px display--b align--h--center" src={require('themes/assets/img/logo.svg')} alt="Logo" />
      <form className="form card card--xlrg card--primary spc--top--med" onSubmit={loginForm.onSubmit}>
        <h3 className="spc--bottom--sml">Login</h3>
        <div className="form__group">
          <BasicInput field={loginForm.$('email')} />
        </div>
        <div className="form__group">
          <BasicInput field={loginForm.$('password')} />
        </div>
        {loginForm.error && (
          <div>
            <p className="type--color--warning">{loginForm.error}</p>
          </div>
        )}
        <div className="clearfix spc--top--sml">
          <div className="push">
            <a className="btn--link spc--top--tny display--ib" onClick={routes.forgotPassword}>
              Forgot Password?
            </a>
          </div>
          <div className="pull">
            <BaasicButton
              className="btn btn--med btn--primary"
              type="submit"
              disabled={loginForm.submitting}
              icon={loginForm.submitting || loginForm.validating ? 'synchronize-arrows-1 rotate' : ''}
              label="Sign In"
            />
            {loading && (
              <span className="loader--login padd--top--med">
                <Loader />
              </span>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

LoginTemplate.propTypes = {};

export default defaultTemplate(LoginTemplate);
