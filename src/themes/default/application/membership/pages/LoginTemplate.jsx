import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton } from 'core/components';
import logo from 'themes/assets/img/logo.svg';

function LoginTemplate({ currentView, t }) {
	const { loginForm, routes } = currentView;
	return (
		<div className="login">
			<div className="login__media"></div>

			<div className="login__info">
				<form className="login__form" onSubmit={loginForm.onSubmit}>
					<div className="login__info--logo">
						<a href="/" ><img src={logo} alt="Logo" /></a>
					</div>
					<h4 className="login__info--title">Welcome</h4>

					<div className="login__info--input">
						<BasicInput field={loginForm.$('email')} />
					</div>

					<div className="login__info--input">
						<BasicInput field={loginForm.$('password')} />
					</div>
					{loginForm.error && (
						<div>
							<p className="type--color--warning type--small u-mar--bottom--med">{loginForm.error}</p>
						</div>
					)}

					<a className="type--sml btn--link" onClick={routes.forgotPassword}>
						{t('LOGIN.FORGOT_PASSWORD_BUTTON')}
					</a>

					<div className="u-group u-mar--top--xlrg">
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
				</form>

				<p className="login__info--rights">{new Date().getFullYear()}. THE DONORS' FUND. ALL RIGHTS RESERVED.</p>
			</div>
		</div>
	);
}

LoginTemplate.propTypes = {
	currentView: PropTypes.object,
	t: PropTypes.func,
};

export default defaultTemplate(LoginTemplate);
