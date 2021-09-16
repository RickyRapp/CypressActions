import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import logo from 'themes/assets/img/new-logo.svg';

function PasswordChangeTemplate({ currentView, t }) {
	const { passwordChangeForm, goToLogin } = currentView;

	return (
		<section>
			<form className="login__card" onSubmit={passwordChangeForm.onSubmit}>
				<img className="login__card__logo" src={logo} alt="Logo" />
				<h3 className="login__card__title">{t('PASSWORD_CHANGE.NEW_PASSWORD_PLACEHOLDER')}</h3>
				<div className="login__card__form">
					<div className="row row--form">
						<div className="col col-sml-12">
							<BasicInput field={passwordChangeForm.$('password')} />
						</div>
						<div className="col col-sml-12 u-mar--top--base">
							<BasicInput field={passwordChangeForm.$('confirmPassword')} />
						</div>
					</div>
					{passwordChangeForm.error && (
						<div>
							<p className="type--color--warning">{passwordChangeForm.error}</p>
						</div>
					)}
					<div className="type--right u-mar--top--base">
						<button className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml" onClick={goToLogin}>
							{t('CANCEL')}
						</button>
						<BaasicButton
							className="btn btn--med btn--med--wide btn--primary display--ib"
							type="submit"
							label={t('SAVE')}
							disabled={passwordChangeForm.submitting || !passwordChangeForm.isValid}
						/>
					</div>
				</div>
			</form>
		</section>
	);
}

PasswordChangeTemplate.propTypes = {
	currentView: PropTypes.object,
	t: PropTypes.func,
};

export default defaultTemplate(PasswordChangeTemplate);
