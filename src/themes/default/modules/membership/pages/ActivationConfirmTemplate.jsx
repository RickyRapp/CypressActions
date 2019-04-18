import React from 'react';
import { defaultTemplate } from 'core/utils';
import { Loader } from 'core/components';

function ActivationConfirmTemplate({ currentView }) {
  const { routes, errorMessage, loadingActivation } = currentView;

  if (loadingActivation) return <Loader />;

  if (errorMessage === null) {
    return (
      <div>
        YOUR ACCOUNT HAS BEEN ACTIVATED
        <br />
        CLICK{' '}
        <a className="register" onClick={routes.login}>
          HERE
        </a>{' '}
        TO GO TO LOGIN PAGE
      </div>
    );
  } else {
    return <div>{errorMessage}</div>;
  }
}

export default defaultTemplate(ActivationConfirmTemplate);
