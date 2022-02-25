import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import logo from 'themes/assets/img/new-logo.svg';

function PasswordRecoveryTemplate({ currentView, t }) {
	const { form, loading, goToLogin } = currentView;
	return (
		<div className="login">
			<div className="login__media"></div>

			<div className="login__info">
				<form className="login__form" onSubmit={form.onSubmit}>
					<div className="login__logo">
						<a href="/" ><img src={logo} alt="Logo" /></a>
					</div>

					<div className="login__wrapper">
						<h4 className="login__title login__title--secondary">{t('PASSWORD_RECOVERY.TITLE')}</h4>
						<p className="login__desc">{t('PASSWORD_RECOVERY.DESCRIPTION')}</p>

						<div>
							<div className="form__group">
								<BasicInput field={form.$('userName')} />
							</div>
							{form.error && (
								<div>
									<p className="type--color--warning">{form.error}</p>
								</div>
							)}
							<div className="u-mar--top--base">
								<BaasicButton
									className="btn btn--med btn--secondary display--ib u-mar--right--sml"
									type="submit"
									label={t('PASSWORD_RECOVERY.RESET_BUTTON')}
									disabled={form.submitting || form.validating}
								/>
								<button className="btn btn--med btn--med--wide btn--ghost" onClick={goToLogin}>
									{t('PASSWORD_RECOVERY.CANCEL_BUTTON')}
								</button>
								{loading && <span className="spc--top--tny display--ib">{t('PASSWORD_RECOVERY.LOGGING_IN')}</span>}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

PasswordRecoveryTemplate.propTypes = {
	currentView: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(PasswordRecoveryTemplate);
