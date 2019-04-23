import React from 'react';
import { BasicInput, BasicFieldRecaptcha, BaasicButton, Loader } from 'core/components';
import { defaultTemplate } from 'core/utils';

function RegisterPublicTemplate({ currentView }) {
  const { form, loading } = currentView;
  return (
    <form className="form card card--xlrg card--primary spc--top--med" onSubmit={form.onSubmit}>
      <h3 className="spc--bottom--sml">Register</h3>
      <div className="f-row">
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('fundName')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('firstName')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('middleName')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('lastName')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('email')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('password')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('confirmPassword')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('addressLine1')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('addressLine2')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('city')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('state')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('zipCode')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('number')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('numberDescription')} />
        </div>
        <div className="form__group f-col f-col-lrg-6">
          <BasicInput field={form.$('securityPin')} />
        </div>
        {/* <BasicFieldRecaptcha field={form.$('botProtection')} /> */}
        {form.error && (
          <div>
            <p>{form.error}</p>
          </div>
        )}
      </div>
      <div className="pull">
        <BaasicButton
          className="btn btn--med btn--primary"
          type="submit"
          disabled={form.submitting}
          icon={form.submitting || form.validating ? 'synchronize-arrows-1 rotate' : ''}
          label="Register"
        />
        {loading && (
          <span className="loader--login padd--top--med">
            <Loader />
          </span>
        )}
      </div>
    </form>
  );
}

export default defaultTemplate(RegisterPublicTemplate);
