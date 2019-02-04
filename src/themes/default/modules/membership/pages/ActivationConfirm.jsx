import React from 'react';
import { defaultTemplate } from 'core/utils';
import { Loader } from 'core/components';

function ActivationConfirmTemplate({ viewStore }) {
  const {
    routes,
    registerView: { errorMessage, loadingActivation }
  } = viewStore;

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
