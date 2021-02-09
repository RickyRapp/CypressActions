import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton, NumericInputField, BaasicFieldDropdown, NumberFormatInputField } from 'core/components';
import logo from 'themes/assets/img/logo.svg';

function FirstLoginExistingDonorTemplate({ currentView, t }) {
	const { form, monthDropdownStore } = currentView;
	return (
		<div className="">
			<form className="" onSubmit={form.onSubmit}>
				<h4 className="">All you need to give all you want</h4>

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

				<div className="u-group u-mar--top--xlrg">
					<BaasicButton
						className="btn btn--100 btn--secondary"
						onlyIconClassName="u-mar--right--sml"
						type="submit"
						disabled={form.submitting}
						icon={
							form.submitting || form.validating ? 'u-icon u-icon--med u-icon--sync u-rotate--login' : ''
						}
						label={t('FIRST_LOGIN_EXISTING_DONOR.SIGNIN_BUTTON')}
					/>
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
