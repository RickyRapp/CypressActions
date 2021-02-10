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
				<h4 className="login__card__title">All you need to give all you want</h4>
				<p className="login__card__desc">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nihil perferendis eius reprehenderit quis odio
					dicta quia, ab consectetur cupiditate est incidunt itaque ducimus id. Veniam optio ipsum fuga, quam illum
					magni vero recusandae eveniet facilis maiores, rerum laborum quia!
				</p>

				<div className="login__card__form">
					<div className="row">
						<div className="form__group col col-sml-12 col-lrg-4">
							<BaasicFieldDropdown store={monthDropdownStore} field={form.$('month')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<NumericInputField field={form.$('day')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<NumericInputField field={form.$('year')} />
						</div>
					</div>

					<div className="row">
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('securityPin')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('confirmSecurityPin')} />
						</div>
					</div>

					<div className="row">
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
