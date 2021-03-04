import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BasicInput,
	BaasicButton,
	NumericInputField,
	BaasicFieldDropdown,
	NumberFormatInputField,
} from 'core/components';
import logo from 'themes/assets/img/new-logo.svg';

function FirstLoginExistingDonorTemplate({ currentView, t }) {
	const { form, monthDropdownStore } = currentView;
	return (
		<div className="">
			<form className="login__card" onSubmit={form.onSubmit}>
				<img className="login__card__logo" src={logo} alt="Logo" /> 
				<h4 className="login__card__title">Welcome to a new way of giving</h4>
				<p className="login__card__desc">
					Updte your profile to meet our new and robust security requirements
				</p>

				<div className="login__card__form">
					<div className="row row--form">
						<div className="form__group col col-sml-12 col-lrg-12">
							<BasicInput field={form.$('fundName')} />
						</div>
					</div>
					<div className="row row--form">
						<div className="col col-sml-12 col-lrg-12">
							<label className="form__group__label">Date of Birth</label>
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<BaasicFieldDropdown store={monthDropdownStore} field={form.$('month')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<NumericInputField field={form.$('day')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<NumericInputField
								field={form.$('year')}
								formatOptions={{
									style: 'decimal',
									useGrouping: false
								}} />
						</div>
					</div>

					<div className="row row--form">
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('securityPin')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('confirmSecurityPin')} />
						</div>
					</div>

					<div className="row row--form">
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('password')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('confirmPassword')} />
						</div>
					</div>

					{form.error && (
						<div>
							<p className="type--color--warning type--small u-mar--bottom--med">{form.error}</p>
						</div>
					)}

					<div className="u-group u-mar--top--med">
						<BaasicButton
							className="btn btn--100 btn--secondary"
							onlyIconClassName="u-mar--right--sml"
							type="submit"
							disabled={form.submitting}
							icon={form.submitting || form.validating ? 'u-icon u-icon--med u-icon--sync u-rotate--login' : ''}
							label={t('FIRST_LOGIN_EXISTING_DONOR.SIGNIN_BUTTON')}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

FirstLoginExistingDonorTemplate.propTypes = {
	currentView: PropTypes.object,
	t: PropTypes.func,
};

export default defaultTemplate(FirstLoginExistingDonorTemplate);
