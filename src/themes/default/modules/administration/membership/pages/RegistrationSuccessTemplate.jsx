import React from 'react';
import { defaultTemplate } from 'core/utils';

function RegistrationSuccessTemplate({ currentView }) {
  const { routes } = currentView;

  return (
    <div>
      REGSITRATION SUCCESSFUL
      <br />
      ACTIVATION LINK HAS BEEN SENT TO YOUR EMAIL ADRESS
      <br />
      CLICK{' '}
      <a className="success" onClick={routes.login}>
        HERE
      </a>{' '}
      TO GO TO LOGIN PAGE
    </div>
  );
}

export default defaultTemplate(RegistrationSuccessTemplate);
