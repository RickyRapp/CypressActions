import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicRecaptcha } from 'core/components';

function PasswordRecoveryTemplate({ currentView }) {
  const { form, loading, onVerifyRecaptcha, goToLogin } = currentView;
  return (
    <section className="w--400--px align--h--center padd--top--med">
      <form
        className="form card card--med spc--top--med"
        onSubmit={form.onSubmit}
      >
        <h3 className="spc--bottom--sml">FORGOT YOUR PASSWORD?</h3>
        <span>
          Enter your signup e-mail, and we'll send you a link to reset your
          password.
        </span>
        <BasicInput field={form.$('email')} />
        <BaasicRecaptcha verifyCallback={onVerifyRecaptcha} />
        {form.error && (
          <div>
            <p className="type--color--warning">{form.error}</p>
          </div>
        )}
        <div>
          <button
            className="btn btn--med btn--primary spc--top--tny display--ib"
            type="submit"
          >
            Reset Password
          </button>
          <a onClick={goToLogin}>Cancel</a>
          {loading && (
            <span className="spc--top--tny display--ib">Logging in...</span>
          )}
        </div>
      </form>
    </section>
  );
}

export default defaultTemplate(PasswordRecoveryTemplate);
