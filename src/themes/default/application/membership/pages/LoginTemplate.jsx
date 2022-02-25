import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton } from 'core/components';
import logo from 'themes/assets/img/new-logo.svg';

function LoginTemplate({ currentView, t }) {
	const { loginForm, routes } = currentView;
	return (
		<div className="login">
			<div className="login__media"></div>

			<div className="login__info">
				<form className="login__form" onSubmit={loginForm.onSubmit}>
					<div className="login__logo">
						<a href="/" ><img src={logo} alt="Logo" /></a>
					</div>

					<div>
						<h4 className="login__title">Welcome</h4>

						<div className="u-mar--bottom--med">
							<BasicInput field={loginForm.$('email')} />
						</div>

						<div className="u-mar--bottom--sml">
							<BasicInput field={loginForm.$('password')} />
						</div>
						{loginForm.error && (
							<div>
								<p className="type--color--warning type--small u-mar--bottom--med">{loginForm.error}</p>
							</div>
						)}

						<a className="type--base btn--link" onClick={routes.forgotPassword}>
							{t('LOGIN.FORGOT_PASSWORD_BUTTON')}
						</a>

						<div className="u-mar--top--xlrg">
							<BaasicButton
								className="btn btn--100 btn--secondary"
								onlyIconClassName="u-mar--right--sml"
								type="submit"
								disabled={loginForm.submitting}
								icon={
									loginForm.submitting || loginForm.validating ? 'u-icon u-icon--med u-icon--sync u-rotate--login' : ''
								}
								label={t('LOGIN.SIGNIN_BUTTON')}
							/>
						</div>

						<div className="type--center u-mar--top--lrg">
							<div className="u-display--flex u-display--flex--align--center u-display--flex--justify--center u-mar--bottom--xsml">
								<span className="login__separator"></span>
								<span className="type--sml type--color--opaque">OR</span>
								<span className="login__separator"></span>
							</div>

							<a className="type--base btn--link" href="https://tdfcharitable.org/create-account.html" target="_blank">
								{t('LOGIN.SIGNUP_BUTTON')}
							</a>
						</div>
					</div>
				</form>

				<p className="type--sml type--color--opaque">{new Date().getFullYear()}. THE DONORS' FUND. ALL RIGHTS RESERVED.</p>
			</div>
		</div>
	);
}

LoginTemplate.propTypes = {
	currentView: PropTypes.object,
	t: PropTypes.func,
};

export default defaultTemplate(LoginTemplate);
