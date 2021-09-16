import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import logo from 'themes/assets/img/new-logo.svg';

function PasswordRecoveryTemplate({ currentView, t }) {
	const { form, loading, goToLogin } = currentView;
	return (
		<section>
			<form className="login__card" onSubmit={form.onSubmit}>
				<img className="login__card__logo" src={logo} alt="Logo" />
				<h5 className="login__card__title login__card__title--secondary">{t('PASSWORD_RECOVERY.TITLE')}</h5>
				<p className="login__card__desc">{t('PASSWORD_RECOVERY.DESCRIPTION')}</p>

				<div className="login__card__form">
					<div className="form__group">
						<BasicInput field={form.$('userName')} />
					</div>
					{form.error && (
						<div>
							<p className="type--color--warning">{form.error}</p>
						</div>
					)}
					<div className="type--right u-mar--top--base">
						<BaasicButton
							className="btn btn--med btn--primary display--ib u-mar--right--sml"
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
			</form>
		</section>
	);
}

PasswordRecoveryTemplate.propTypes = {
	currentView: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(PasswordRecoveryTemplate);
