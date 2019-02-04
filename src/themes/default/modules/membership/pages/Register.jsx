import React from 'react';
import { BasicInput, BasicFieldRecaptcha } from 'core/components';
import { defaultTemplate } from 'core/utils';

function RegisterTemplate({ currentView }) {
  const { registerForm, loading } = currentView;
  return (
    <div>
      <form className="form" onSubmit={registerForm.onSubmit}>
        <h3 className="spc--bottom--sml">Register</h3>
        <BasicInput field={registerForm.$('username')} />
        <BasicInput field={registerForm.$('email')} />
        <BasicInput field={registerForm.$('password')} />
        <BasicInput field={registerForm.$('confirmPassword')} />
        <BasicFieldRecaptcha field={registerForm.$('botProtection')} />
        {registerForm.error && (
          <div>
            <p>{registerForm.error}</p>
          </div>
        )}
        <p>
          <button type="submit" disabled={loading}>
            {' '}
            Register
          </button>
          {loading && <span style={{ paddingLeft: 10 }}>Registering...</span>}
        </p>
      </form>
    </div>
  );
}

export default defaultTemplate(RegisterTemplate);
