import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function PasswordChangeTemplate({ currentView, t }) {
    const { passwordChangeForm, goToLogin } = currentView;

    return <section>
        <form className="form card card--med spc--top--med" onSubmit={passwordChangeForm.onSubmit}>
            <h3 className="spc--bottom--sml">{t('PASSWORD_CHANGE.NEW_PASSWORD_PLACEHOLDER')}</h3>
            <BasicInput field={passwordChangeForm.$('password')} />
            <BasicInput field={passwordChangeForm.$('confirmPassword')} />
            {
                passwordChangeForm.error && (
                    <div>
                        <p className="type--color--warning">{passwordChangeForm.error}</p>
                    </div>
                )
            }
            <div>
                <BaasicButton className="btn btn--med btn--med--wide btn--primary spc--top--sml display--ib" type='submit' label={t('SAVE')} disabled={passwordChangeForm.submitting || !passwordChangeForm.isValid} />
                <a onClick={goToLogin}>{t('CANCEL')}</a>
            </div>
        </form>
    </section>
}

PasswordChangeTemplate.propTypes = {
    currentView: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(PasswordChangeTemplate);