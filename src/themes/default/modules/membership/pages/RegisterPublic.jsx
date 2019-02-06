import React from 'react';
import { BasicInput, BasicFieldRecaptcha, BaasicButton, Loader } from 'core/components';
import { defaultTemplate } from 'core/utils';

function RegisterPublicTemplate({ currentView }) {
  const { registerPublicForm, loading } = currentView;
  return (
    <div>
      <form className="form card card--xlrg card--primary spc--top--med" onSubmit={registerPublicForm.onSubmit}>
        <h3 className="spc--bottom--sml">Register</h3>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('fundName')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('firstName')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('middleName')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('lastName')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('email')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('password')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('confirmPassword')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('addressLine1')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('addressLine2')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('city')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('state')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('zipCode')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('number')} />
        </div>
        <div className="form__group">
          <BasicInput field={registerPublicForm.$('numberDescription')} />
        </div>
        {/* <BasicFieldRecaptcha field={registerPublicForm.$('botProtection')} /> */}
        {registerPublicForm.error && (
          <div>
            <p>{registerPublicForm.error}</p>
          </div>
        )}
        <div className="pull">
          <BaasicButton
            className="btn btn--med btn--primary"
            type="submit"
            disabled={registerPublicForm.submitting}
            icon={registerPublicForm.submitting || registerPublicForm.validating ? 'synchronize-arrows-1 rotate' : ''}
            label="Register"
          />
          {loading && (
            <span className="loader--login padd--top--med">
              <Loader />
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default defaultTemplate(RegisterPublicTemplate);
