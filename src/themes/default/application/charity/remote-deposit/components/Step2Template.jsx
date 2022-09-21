import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver, BasicInput, BaasicButton, NumericInputField } from 'core/components';

function Step2Template({ form, onNextStepClick, isChangedDefaultAddress, charityName, charityAddress, taxId, phoneNumber, paymentMethod, addEmailField, emailInputs, handleEmailChange, removeEmailInputField }) {
	const charityPhoneNumber = {
		number: phoneNumber
	}

	return (
		<div className="container--sidebar">
			<div className="card--primary card--med">
				<div className="form__group">
					<BasicInput field={form.$('fullName')} />
				</div>

				{isChangedDefaultAddress &&
					<div className="card--secondary card--med u-mar--bottom--sml">
						<div className="row">
							<div className="form__grou col col-sml-12">
								<BasicInput field={form.$('addressLine1')} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
								<BasicInput field={form.$('addressLine2')} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
								<BasicInput field={form.$('city')} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
								<BasicInput field={form.$('state')} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
								<BasicInput field={form.$('zipCode')} />
							</div>
						</div>
					</div>
				}
				<div className="form__group">
					<BasicInput field={form.$('description')} />
				</div>

				<div className="form__group">
					<NumericInputField field={form.$('checkCount')} />
				</div>

				<div className="form__group u-mar--bottom--med">
					<NumericInputField field={form.$('estimatedAmount')} />
				</div>

				<div className="card--enh--light card--sml">
					<p className="type--color--primary">
						To receive a report of this session please enter your email address bellow
					</p>
				</div>

				{
					emailInputs.map((input, index) => { 
						return(
						<div key={index}>
							<input 
								className={'input input--lrg input--text'} 
								name="email" 
								placeholder="Email"
								onChange={event => handleEmailChange(index, event)}
								/>
								<p class="validation__message">{input.message}</p>
						</div>
						)
					})
				}

				<button
					className="btn btn--med btn--ghost search__wrapper__item"
					onClick={addEmailField}
				>
					Add Email
				</button>
				{emailInputs.length > 1 && (
					<button
						className="btn btn--med btn--primary search__wrapper__item"
						onClick={removeEmailInputField}
					>
						Remove email
					</button>
				)}
				
				<div className="type--right u-mar--top--med">
					<BaasicButton
						className="btn btn--med btn--secondary"
						classNameExtend="u-display--flex--justify--center"
						onClick={onNextStepClick}
						label="SESSION.CREATE.STEP2.BUTTONS.SAVE"
					/>
				</div>
			</div>

			<div>
				<div className="card--med card--primary u-mar--bottom--med">
					<div className="u-mar--bottom--sml">
						<labael className="form__group__label">Charity name:</labael>
						<p className="type--wgt--bold">{charityName}</p>
					</div>
					<div className="u-mar--bottom--sml">
						<labael className="form__group__label">EIN:</labael>
						<p className="type--wgt--bold">{taxId}</p>
					</div>
					<div className="u-mar--bottom--sml">
						<labael className="form__group__label">Address:</labael>
						<p className="type--wgt--bold">{charityAddress}</p>
					</div>
					<div className="u-mar--bottom--sml">
						<labael className="form__group__label">Phone number:</labael>
						<p className="type--wgt--bold">
							<FormatterResolver
								item={charityPhoneNumber}
								field='number'
								format={{ type: 'phone-number' }}
							/>
						</p>
					</div>
					<div>
						<labael className="form__group__label">Payment method:</labael>
						<p className="type--wgt--bold">{paymentMethod}</p>
					</div>
				</div>

			</div>

		</div>
	);
}

Step2Template.propTypes = {
	form: PropTypes.object.isRequired,
	onPreviousStepClick: PropTypes.func.isRequired,
	onNextStepClick: PropTypes.func.isRequired,
	charityDropdownStore: PropTypes.object.isRequired,
	t: PropTypes.func,
	isChangedDefaultAddress: PropTypes.bool,
	onChangeDefaultAddressClick: PropTypes.func,
	filterCharities: PropTypes.func,
	setCharityId: PropTypes.func,
	isCharitySelected: PropTypes.bool
};

export default defaultTemplate(Step2Template);
