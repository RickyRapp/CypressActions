import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput } from 'core/components';

function PasswordChangeTemplate({ currentView }) {
  const { passwordChangeForm, goToLogin } = currentView;

  return (
    <section className="w--400--px align--h--center padd--top--med">
      <form
        className="form card card--med spc--top--med"
        onSubmit={passwordChangeForm.onSubmit}
      >
        <h3 className="spc--bottom--sml">ENTER NEW PASSWORD</h3>
        <BasicInput field={passwordChangeForm.$('password')} />
        <BasicInput field={passwordChangeForm.$('confirmPassword')} />
        {passwordChangeForm.error && (
          <div>
            <p className="type--color--warning">{form.error}</p>
          </div>
        )}
        <div>
          <button
            className="btn btn--med btn--primary spc--top--tny display--ib"
            type="submit"
          >
            Submit
          </button>
          <a onClick={goToLogin}>Cancel</a>
        </div>
      </form>
    </section>
  );
}

export default defaultTemplate(PasswordChangeTemplate);
